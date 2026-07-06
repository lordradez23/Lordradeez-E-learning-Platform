"use server";
import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/db";
import { generateJWT, getUserFromToken } from "@/lib/JWT";
import { loginSchema } from "@/schema/loginSchema";
import { serverRegisterSchema } from "@/schema/registerSchema";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getAllUsersAction() {
  try {
    return await prisma.user.findMany({
      include: {
        reviews: true,
        enrollments: true,
        comments: {
          include: {
            course: true,
            user: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("getAllUsersAction error:", error);
    return [];
  }
}

export async function getUserAction(id: number) {
  try {
    // check if user is logged in
    const token = (await cookies()).get("jwtToken")?.value;
    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
    if (decoded.id !== id || decoded.role !== "ADMIN") {
      throw new Error("Forbidden: You can only access your own data");
    }
    // get user
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        reviews: true,
        enrollments: true,
      },
    });
    if (!user) {
      console.warn(`User not found for id: ${id}`);
      return null;
    }
    // return user
    return {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      reviews: user.reviews,
      enrollments: user.enrollments,
      university: user.university,
      username: user.username,
    };
  } catch (error) {
    console.error("getUserAction error:", error);
    return null;
  }
}

export async function createUserAction(data: Prisma.UserCreateInput) {
  try {
    // validate data
    const parsed = serverRegisterSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, message: "Invalid input data", status: 400 };
    }
    // check if user already exists by email
    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });
    if (user) {
      return { success: false, message: "User already exists", status: 400 };
    }
    // create user and hash the password
    await prisma.user.create({
      data: { ...parsed.data, password: await bcrypt.hash(parsed.data.password, 10) },
    });
    return { success: true, message: "User created successfully", status: 201 };
    // Handle unexpected errors
  } catch (error) {
    console.error("createUserAction error:", error);
    return { success: false, message: "Something went wrong", status: 500 };
  }
}

export async function userLoginAction(data: { email: string; password: string }) {
  try {
    // validate data
    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, message: "Invalid input data", status: 400 };
    }
    // check if user doesn't exists by email
    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });
    if (!user) {
      return { success: false, message: "Invalid email or password", status: 401 };
    }
    // check if password is correct by comparing hashed password
    const isPasswordValid = await bcrypt.compare(parsed.data.password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Invalid email or password", status: 401 };
    }
    const token = generateJWT({
      id: user.id,
      fullName: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatarUrl,
    });

    (await cookies()).set("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 10,
    });
    // login successful
    return { success: true, message: "Login successful", status: 200 };
    // Handle unexpected errors
  } catch (error) {
    console.error("userLoginAction error:", error);
    return { success: false, message: "Something went wrong", status: 500 };
  }
}

export async function userLogoutAction() {
  try {
    (await cookies()).delete("jwtToken");
    return { success: true, message: "Logout successful", status: 200 };
  } catch (error) {
    console.error("userLogoutAction error:", error);
    return { success: false, message: "Something went wrong", status: 500 };
  }
}

export async function deleteUserAction(id: number) {
  try {
    const decoded = await getUserFromToken();
    if (!decoded) {
      return { success: false, message: "Unauthorized", status: 401 };
    }
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return { success: false, message: "User not found", status: 404 };
    }
    if (decoded.id !== id || decoded.role !== "ADMIN") {
      return { success: false, message: "Forbidden", status: 403 };
    }
    await prisma.user.delete({
      where: { id },
    });
    return { success: true, message: "User deleted successfully", status: 200 };
  } catch (error) {
    console.error("deleteUserAction error:", error);
    return { success: false, message: "Something went wrong", status: 500 };
  }
}

export async function updateUserAction(id: number, data: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return { success: false, message: "User not found", status: 404 };
    }
    //todo : add update schema

    const existEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (data.email === existEmail?.email) {
      return { success: false, message: "Email already exists", status: 400 };
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    await prisma.user.update({
      where: { id },
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        avatarUrl: data.avatarUrl,
      },
    });
    return { success: true, message: "User Updated successfully", status: 200 };
  } catch (error) {
    console.error("updateUserAction error:", error);
    return { success: false, message: "Something went wrong", status: 500 };
  }
}

export async function getNewStudentsAction() {
  const now = new Date();
  const lastMonth = new Date();
  lastMonth.setDate(now.getDate() - 30);

  try {
    const newStudents = await prisma.user.findMany({
      where: {
        role: "USER",
        createdAt: {
          gte: lastMonth,
        },
      },
    });

    return newStudents;
  } catch (error) {
    console.error("getNewStudentsAction error:", error);
    return [];
  }
}
