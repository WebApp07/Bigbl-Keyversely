"use server";

import { prisma } from "@/db/prisma";
import { PAGE_SIZE } from "../constants";
import { convertToPlainObject, formatError } from "../utils";
import { revalidatePath } from "next/cache";
import { insertProductSchema, updateProductSchema } from "../validators";
import z from "zod";
import { Prisma } from "@prisma/client";

// Get latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });
  return convertToPlainObject(data);
}

// Get a single product by its slug
export async function getProductBySlug(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      where: { slug },
    });

    if (!product) return null;

    return convertToPlainObject(product);
  } catch (error) {
    console.error("Failed to fetch product by slug:", error);
    throw new Error("Could not load product");
  }
}

// Get single product by its ID
export async function getProductById(productId: string) {
  const data = await prisma.product.findFirst({
    where: { id: productId },
  });

  return convertToPlainObject(data);
}

// Get all products with pagination and filters
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
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          },
        }
      : {};

  const categoryFilter = category && category !== "all" ? { category } : {};

  const data = await prisma.product.findMany({
    where: { ...queryFilter, ...categoryFilter },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalCount = await prisma.product.count({
    where: { ...queryFilter, ...categoryFilter },
  });

  return {
    data,
    totalPages: Math.ceil(totalCount / limit),
  };
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    const productExists = await prisma.product.findFirst({
      where: { id },
    });

    if (!productExists) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    await prisma.product.delete({ where: { id } });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Create a new product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data);
    await prisma.product.create({
      data: { ...product, isFeatured: false },
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Update a product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);

    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExists) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath("/admin/products");

    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Get all categories
export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ["category"],
    _count: true,
  });
  return data;
}

// Get featured products
export async function getFeaturedProducts() {
  const data = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return convertToPlainObject(data);
}
