import { getCategoriesAction } from "@/actions/categoryActions";
import { getAllInstructorsAction } from "@/actions/instructorActions";
import AddCourseForm from "./AddCourseForm";
import { notFound } from "next/navigation";

const page = async () => {
  const categories = await getCategoriesAction();
  const instructors = await getAllInstructorsAction();

  if (!categories || !instructors) {
    notFound();
  }

  return (
    <>
      <AddCourseForm categories={categories} instructors={instructors} />
    </>
  );
};

export default page;
