import { getCoursesAction } from "@/actions/courseActions";
import AddCourseForm from "./AddCourseForm";
import { notFound } from "next/navigation";

const page = async () => {
  const courses = await getCoursesAction();
  if (!courses) {
    notFound();
  }
  return (
    <>
      <AddCourseForm courses={courses} />
    </>
  );
};

export default page;
