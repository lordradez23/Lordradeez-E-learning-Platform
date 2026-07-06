"use server";
import prisma from "@/lib/db";
import { generateSlug } from "@/lib/slugify";
import { revalidatePath } from "next/cache";
import { getUserFromToken } from "@/lib/JWT";
import { CourseSchemaType } from "@/schema/courseSchema";
import slugify from "slugify";

export async function getCoursesAction(skip: number = 0, take: number = 1000) {
  try {
    return await prisma.course.findMany({
      skip,
      take,
      include: {
        enrollments: {
          include: {
            user: true,
            course: true,
          },
        },
        category: true,
        instructor: true,
        reviews: {
          include: {
            user: true,
            course: true,
          },
        },
        learnings: {
          include: {
            items: true,
            course: true,
          },
        },
        Chapters: {
          include: {
            details: true,
          },
        },
        courseRating: true,
        comments: {
          include: {
            course: true,
            user: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("getCoursesAction error:", error);
    return [];
  }
}

export async function getCourseBySlugAction(slug: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        enrollments: {
          include: {
            user: true,
            course: true,
          },
        },
        category: true,
        instructor: true,
        reviews: true,
        learnings: {
          include: {
            items: true,
            course: true,
          },
        },
        Chapters: {
          orderBy: { createdAt: "asc" },
          include: {
            details: {
              orderBy: { createdAt: "asc" },
            },
          },
        },
        courseRating: true,
        comments: {
          include: {
            course: true,
            user: true,
          },
        },
      },
    });
    if (!course) {
      console.warn(`Course not found for slug: ${slug}`);
      return null;
    }
    return course;
  } catch (error) {
    console.error("getCourseBySlug error:", error);
    return null;
  }
}

export async function createCourseAction(data: CourseSchemaType) {
  try {
    const user = await getUserFromToken();
    if (!user || user.role !== "ADMIN") {
      return {
        success: false,
        message: "Unauthorized: Only admins can create courses",
        status: 403,
      };
    }

    const { Chapters, ...courseData } = data;
    const slug = await generateSlug("Course", data.title);

    await prisma.course.create({
      data: {
        ...courseData,
        slug,
        Chapters: {
          create: Chapters.map((chapter) => ({
            topic: chapter.topic,
            duration: chapter.duration,
            details: {
              create: chapter.details.map((lesson) => ({
                title: lesson.title,
                duration: lesson.duration,
                video: lesson.video,
                slug: slugify(lesson.title, { lower: true, strict: true }),
              })),
            },
          })),
        },
      },
    });

    revalidatePath("/admin/courses");
    return {
      success: true,
      message: "Course created successfully",
      status: 201,
    };
  } catch (error) {
    console.error("createCourseAction error:", error);
    return {
      success: false,
      message: "Something went wrong from server",
      status: 500,
    };
  }
}

export async function updateCourseAction(id: number, data: CourseSchemaType) {
  try {
    const user = await getUserFromToken();
    if (!user || user.role !== "ADMIN") {
      return {
        success: false,
        message: "Unauthorized: Only admins can update courses",
        status: 403,
      };
    }

    const { Chapters, ...courseData } = data;

    // Simple strategy for update: delete existing chapters/lessons and recreate
    // This is easier for complex nested syncs in this context
    await prisma.$transaction(async (tx) => {
      // 1. Delete existing lessons for this course's chapters
      await tx.lesson.deleteMany({
        where: {
          chapter: {
            courseId: id,
          },
        },
      });

      // 2. Delete existing chapters
      await tx.chapter.deleteMany({
        where: {
          courseId: id,
        },
      });

      // 3. Update course and recreate chapters/lessons
      await tx.course.update({
        where: { id },
        data: {
          ...courseData,
          Chapters: {
            create: Chapters.map((chapter) => ({
              topic: chapter.topic,
              duration: chapter.duration,
              details: {
                create: chapter.details.map((lesson) => ({
                  title: lesson.title,
                  duration: lesson.duration,
                  video: lesson.video,
                  slug: slugify(lesson.title, { lower: true, strict: true }),
                })),
              },
            })),
          },
        },
      });
    });

    revalidatePath("/admin/courses");
    revalidatePath(`/all-courses/${data.title}`); // Potential slug change if title changes?
    // Note: In a real app, you might NOT want to change the slug if title changes to avoid broken links.
    
    return {
      success: true,
      message: "Course updated successfully",
      status: 200,
    };
  } catch (error) {
    console.error("updateCourseAction error:", error);
    return {
      success: false,
      message: "Something went wrong from server",
      status: 500,
    };
  }
}

export async function deleteCourseAction(id: number) {
  try {
    const user = await getUserFromToken();
    if (!user || user.role !== "ADMIN") {
      return {
        success: false,
        message: "Unauthorized: Only admins can Delete courses",
        status: 403,
      };
    }

    await prisma.$transaction([
      prisma.comment.deleteMany({ where: { courseId: id } }),
      prisma.review.deleteMany({ where: { courseId: id } }),
      prisma.enrollment.deleteMany({ where: { courseId: id } }),
      prisma.courseRating.deleteMany({ where: { courseId: id } }),
      prisma.learningItem.deleteMany({
        where: {
          learning: {
            courseId: id,
          },
        },
      }),
      prisma.courseLearning.deleteMany({
        where: {
          courseId: id,
        },
      }),
      prisma.lesson.deleteMany({
        where: {
          chapter: {
            courseId: id,
          },
        },
      }),
      prisma.chapter.deleteMany({
        where: {
          courseId: id,
        },
      }),

      prisma.course.delete({
        where: {
          id,
        },
      }),
    ]);

    revalidatePath("/admin/courses");
    return {
      success: true,
      message: "Course deleted successfully",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong from server",
      status: 500,
    };
  }
}
