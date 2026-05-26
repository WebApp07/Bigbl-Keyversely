/*
  Warnings:

  - Made the column `faqs` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `features` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "faqs" SET NOT NULL,
ALTER COLUMN "features" SET NOT NULL;
