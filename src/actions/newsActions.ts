"use server";

import prisma from "@/lib/db";
// import { Prisma } from "@/generated/prisma";

export async function getAllNewsAction() {
  try {
    return await prisma.news.findMany({
      include: {
        category: true,
      },
    });
  } catch (error) {
    console.error("getAllNewsAction error:", error);
    return [];
  }
}

export async function getAchievements() {
  const [coursesCount, instructorsCount, enrollsCount, activeUsersCount] = await Promise.all([
    prisma.course.count(),
    prisma.instructor.count(),
    prisma.enrollment.count(),
    prisma.user.count(),
  ]);

  return {
    courses: coursesCount,
    instructors: instructorsCount,
    courseEnrolls: enrollsCount,
    activeUsers: activeUsersCount,
  };
}