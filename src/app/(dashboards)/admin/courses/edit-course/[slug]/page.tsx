import EditCourseForm, { CourseWithRelations } from "./EditCourseForm";
import { getCourseBySlugAction } from "@/actions/courseActions";
import { notFound } from "next/navigation";
import { getCategoriesAction } from "@/actions/categoryActions";
import { getAllInstructorsAction } from "@/actions/instructorActions";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const course = await getCourseBySlugAction(slug);
  const categories = await getCategoriesAction();
  const instructors = await getAllInstructorsAction();

  if (!course || !categories || !instructors) {
    notFound();
  }

  // Need to ensure course includes the nested Chapters and lessons as expected by the form
  // The getCourseBySlugAction already includes Chapters and lessons, but let's double check properties.

  return (
    <>
      <EditCourseForm course={course as unknown as CourseWithRelations} categories={categories} instructors={instructors} />
    </>
  );
};

export default page;
