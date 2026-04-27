import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Attempting to add 'published' column via raw SQL...");
    await prisma.$executeRawUnsafe(`ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "published" BOOLEAN DEFAULT true;`);
    console.log("Column added successfully!");
  } catch (error) {
    console.error("Failed to add column:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
