"use client";
import { Prisma } from "@/generated/prisma/client";
import CourseForm from "../../CourseForm";

type Category = Prisma.CategoryGetPayload<Record<string, never>>;
type Instructor = Prisma.InstructorGetPayload<Record<string, never>>;
export type CourseWithRelations = Prisma.CourseGetPayload<{
  include: { Chapters: { include: { details: true } } };
}>;

interface EditCourseFormProps {
  course: CourseWithRelations;
  categories: Category[];
  instructors: Instructor[];
}

const EditCourseForm = ({ course, categories, instructors }: EditCourseFormProps) => {
  return (
    <div className="space-y-6">
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold">Edit Course: {course.title}</h1>
        <p className="text-muted-foreground">Update the course details and curriculum.</p>
      </div>
      <CourseForm initialData={course} categories={categories} instructors={instructors} />
    </div>
  );
};

export default EditCourseForm;
