"use client";
import { Prisma } from "@/generated/prisma/client";
import CourseForm from "../CourseForm";

type Category = Prisma.CategoryGetPayload<Record<string, never>>;
type Instructor = Prisma.InstructorGetPayload<Record<string, never>>;

interface AddCourseFormProps {
  categories: Category[];
  instructors: Instructor[];
}

const AddCourseForm = ({ categories, instructors }: AddCourseFormProps) => {
  return (
    <div className="space-y-6">
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold">Add New Course</h1>
        <p className="text-muted-foreground">Fill in the details to create a new course.</p>
      </div>
      <CourseForm categories={categories} instructors={instructors} />
    </div>
  );
};

export default AddCourseForm;
