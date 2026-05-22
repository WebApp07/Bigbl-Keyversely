"use server";

import { prisma } from "@/db/prisma";
<<<<<<< Updated upstream
import { convertToPlainObject } from "../utils";
=======
import { convertToPlainObject, formatError } from "../utils";
import { PAGE_SIZE } from "../constants";
import { revalidatePath } from "next/cache";
>>>>>>> Stashed changes

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


// Get all products

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
  const data = await prisma.product.findMany({
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
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
