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
  return converToPrismaObject(data); // convert raw database result to plain JS object and return it
}
