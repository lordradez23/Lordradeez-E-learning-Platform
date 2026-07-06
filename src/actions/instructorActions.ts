"use server";

import prisma from "@/lib/db";
// import { Prisma } from "@/generated/prisma";

export async function getAllInstructorsAction() {
  try {
    return await prisma.instructor.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        courses: {
          include: {
            category: true,
            instructor: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("getAllInstructorsAction error:", error);
    return [];
  }
}

export async function getInstructorBySlugAction(slug: string) {
  try {
    const instructor = await prisma.instructor.findUnique({
      where: { slug },
      include: {
        courses: {
          include: {
            category: true,
            instructor: true,
          },
        },
      },
    });
    if (!instructor) {
      console.warn(`instructor not found for slug: ${slug}`);
      return null;
    }
    return instructor;
  } catch (error) {
    console.error("getInstructorBySlug error:", error);
    return null;
  }
}
