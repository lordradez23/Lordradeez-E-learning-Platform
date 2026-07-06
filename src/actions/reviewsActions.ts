"use server";
import prisma from "@/lib/db";
import { Role } from "../generated/prisma/client";

export async function createReviewAction(courseId: number, userId: number, reviewContent: string, rating: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const review = await prisma.review.create({
      data: {
        courseId,
        userId,
        review: reviewContent,
        rating,
      },
      include: {
        user: true,
      },
    });
    return {
      success: true,
      review,
      status: 201,
    };
  } catch (error) {
    console.error("createReviewAction error:", error);
    return {
      success: false,
      message: "Something went wrong",
      status: 500,
    };
  }
}

export async function deleteReviewAction(reviewId: number, userId: number) {
  try {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: { user: true },
    });

    if (!review) {
      return {
        success: false,
        message: "Review not found",
        status: 404,
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
        status: 404,
      };
    }

    const isOwner = review.userId === user.id;
    const isAdmin = user.role === Role.ADMIN;

    if (!isOwner && !isAdmin) {
      return {
        success: false,
        message: "Unauthorized to delete this review",
        status: 403,
      };
    }

    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });
    return {
      success: true,
      message: "Review deleted successfully",
      status: 200,
    };
  } catch (error) {
    console.error("deleteReviewAction error:", error);
    return {
      success: false,
      message: "Something went wrong",
      status: 500,
    };
  }
}

export async function getAllReviewsAction() {
  try {
    return await prisma.review.findMany({
      include: {
        user: true,
        course: true,
      },
    });
  } catch (error) {
    console.error("getAllReviewsAction error:", error);
    return [];
  }
}

export async function getReviewsByCourseIdAction(courseId: number) {
  try {
    return await prisma.review.findMany({
      where: { courseId },
      include: {
        user: true,
        course: true,
      },
    });
  } catch (error) {
    console.error("getReviewsByCourseIdAction error:", error);
    return [];
  }
}
