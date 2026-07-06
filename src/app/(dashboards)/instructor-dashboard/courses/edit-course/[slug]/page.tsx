import EditCourseForm from "./EditCourseForm";
import { getCourseBySlugAction } from "@/actions/courseActions";
import { notFound } from "next/navigation";
import { getCategoriesAction } from "@/actions/categoryActions";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const course = await getCourseBySlugAction(slug);
  const categories = await getCategoriesAction();
  if (!course) {
    notFound();
  }

  return (
    <>
      <EditCourseForm course={course} categories={categories} />
    </>
  );
};

export default page;
