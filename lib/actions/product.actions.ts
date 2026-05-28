"use server";

import { prisma } from "@/db/prisma";
import { PAGE_SIZE } from "../constants";
import { convertToPlainObject, formatError } from "../utils";
import { revalidatePath } from "next/cache";
import { insertProductSchema, updateProductSchema } from "../validators";
import z from "zod";
import { Prisma } from "@prisma/client";

// Create a connection to the database using Prisma Client
//const prisma = new PrismaClient();

// Get latest products
export async function getLatestProducts() {
  // wait for database to respond, findMany = get multiple products
  const data = await prisma.product.findMany({
    take: 4, //// only return 4 products
    orderBy: { createdAt: "desc" }, // sort by newest first
  });
  return convertToPlainObject(data); // convert raw database result to plain JS object and return it
}

// Get a single product by its slug
export async function getProductBySlug(slug: string) {
  try {
    // Find a single product where the slug matches
    const product = await prisma.product.findFirst({
      where: { slug: slug }, // filter by slug
    });

    // If no product found, return null
    if (!product) return null;

    // Convert and return the product
    return convertToPlainObject(product);
  } catch (error) {
    // Log the real error on the server
    console.error("Failed to fetch product by slug:", error);

    // Throw a safe generic message
    throw new Error("Could not load product");
  }
}

// Get single product by it's ID
export async function getProductById(productId: string) {
  const data = await prisma.product.findFirst({
    where: { id: productId },
  });

  return convertToPlainObject(data);
}

//  Get all products

export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
}) {
  // Query Filter
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  const data = await prisma.product.findMany({
    where: queryFilter,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.product.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    const productExists = await prisma.product.findFirst({
      where: { id },
    });
    if (!productExists) throw new Error("Product not found");

    await prisma.product.delete({ where: { id } });

    revalidatePath("/admin/products");

    return {
      sucess: true,
      message: "Product deleted successfuly",
    };

    if (!productExists) {
      return { success: false, message: "Product not found" };
    }

    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin/products");
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Create a new product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data);
    await prisma.product.create({ data: { ...product, isFeatured: false } });
    revalidatePath("/admin/products");
    return { success: true, message: "Product created successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update a  product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);
    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExists) {
      return { success: false, message: "Product not found" };
    }

    await prisma.product.update({ where: { id: product.id }, data: product });
    revalidatePath("/admin/products");
    return { success: true, message: "Product updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
