import { NextResponse } from "next/server";
import prisma from "@/lib/db";

/**
 * @method GET
 * @route /api/courses/search?title=value
 * @description Search for a course by title
 * @access public 
 */

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");
    if (!title) {
        return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 });
    }

    try {
        const course = await prisma.course.findMany({
            where: {
                title: {
                    contains: title,
                    mode: "insensitive",
                },
            },
        });
        if (!course) {
            return NextResponse.json({ success: false, message: "Course not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, course });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
