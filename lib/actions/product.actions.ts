"use server";

import { PrismaClient } from "@prisma/client";
import { converToPrismaObject } from "../utils";

// Create a connection to the database using Prisma Client
const prisma = new PrismaClient();

// Get latest products
export async function getLatestProducts() {
  // wait for database to respond, findMany = get multiple products
  const data = await prisma.product.findMany({
    take: 4, //// only return 4 products
    orderBy: { createdAt: "desc" }, // sort by newest first
  });
  return data.map((p) => ({
    ...p,
    price: p.price.toString(),
    rating: p.rating.toString(),
  }));
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
    return converToPrismaObject(product);
  } catch (error) {
    // Log the real error on the server
    console.error("Failed to fetch product by slug:", error);

    // Throw a safe generic message
    throw new Error("Could not load product");
  }
}
