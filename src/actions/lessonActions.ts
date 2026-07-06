"use server";
import prisma from "@/lib/db";

export async function getLessonBySlugAction(slug: string, lessonSlug: string) {
    try {
        const lesson = await prisma.lesson.findFirst({
            where: {
                slug: lessonSlug,
                chapter: {
                    course: {
                        slug: slug,
                    },
                },
            },
            include: {
                chapter: {
                    select: {
                        topic: true,
                        course: {
                            select: {
                                title: true,
                                slug: true,
                            },
                        },
                    },
                },
            },
        });
        if (!lesson) {
            console.warn(`Lesson not found for slug: ${slug}`);
            return null;
        }
        return lesson;
    } catch (error) {
        console.error("getLessonBySlugAction error:", error);
        return null;
    }
}
