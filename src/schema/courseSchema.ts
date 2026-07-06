import { z } from "zod";

export const lessonSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Lesson title is required"),
  duration: z.string().min(1, "Duration is required"),
  video: z.string().url("Must be a valid URL"),
  slug: z.string().optional(),
});

export const chapterSchema = z.object({
  id: z.number().optional(),
  topic: z.string().min(1, "Chapter topic is required"),
  duration: z.string().min(1, "Duration is required"),
  details: z.array(lessonSchema),
});

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  categoryId: z.number({ required_error: "Category is required" }),
  instructorId: z.number({ required_error: "Instructor is required" }),
  translation: z.string().min(1, "Translation is required"),
  duration: z.string().min(1, "Duration is required"),
  lectures: z.number().min(1, "Lectures must be at least 1"),
  price: z.number().min(0, "Price must be positive"),
  badgeBg: z.string().min(1, "Badge color is required"),
  detailDescription: z.string().min(1, "Detail description is required"),
  Chapters: z.array(chapterSchema),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;
