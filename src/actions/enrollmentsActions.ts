"use server";
import prisma from "@/lib/db";

export async function getEnrollmentsAction(userId: number) {
  try {
    return await prisma.enrollment.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        course: {
          include: {
            category: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("getEnrollmentsAction error:", error);
    return [];
  }
}
