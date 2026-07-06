"use server";
import prisma from "@/lib/db";
// import { Prisma } from "@/generated/prisma";
// import { generateSlug } from "@/lib/slugify";

export async function getCategoriesAction() {
  try {
    return await prisma.category.findMany({
      include: {
        courses: true,
      },
    });
  } catch (error) {
        console.error("getCategoriesAction error:", error);
        return [];
  }
}
