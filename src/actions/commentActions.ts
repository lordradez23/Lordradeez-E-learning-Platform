"use server";
import prisma from "@/lib/db";
import { Role } from "../generated/prisma/client";

export async function createCommentAction(courseId: number, userId: number, content: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const comment = await prisma.comment.create({
      data: {
        courseId,
        userId,
        content,
      },
      include: {
        user: true,
      },
    });
    return {
      success: true,
      comment,
      status: 201,
    };
  } catch (error) {
    console.error("createComment error:", error);
    return {
      success: false,
      message: "Something went wrong",
      status: 500,
    };
  }
}

export async function deleteCommentAction(commentId: number, userId: number) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: { user: true },
    });

    if (!comment) {
      return {
        success: false,
        message: "Comment not found",
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

    const isOwner = comment.userId === user.id;
    const isAdmin = user.role === Role.ADMIN;

    if (!isOwner && !isAdmin) {
      return {
        success: false,
        message: "Unauthorized to delete this comment",
        status: 403,
      };
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return {
      success: true,
      message: "Comment deleted successfully",
      status: 200,
    };
  } catch (error) {
    console.error("deleteCommentAction error:", error);
    return {
      success: false,
      message: "Something went wrong",
      status: 500,
    };
  }
}
