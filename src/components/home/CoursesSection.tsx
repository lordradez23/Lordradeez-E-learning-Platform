import React from "react";
import Courses from "../Courses";
import { getCoursesAction } from "@/actions/courseActions";
import { ArrowNavigation } from "../shared/ArrowNavigation";

const CoursesSection = async ({
  id = "default",
  heading,
  navigation,
}: {
  id?: string;
  heading?: React.ReactNode;
  navigation?: React.ReactElement<{ id: string }>;
}) => {
  const allCourses = await getCoursesAction();
  const navigationWithId = navigation ? React.cloneElement(navigation, { id }) : <ArrowNavigation id={id} />;

  return <Courses courses={allCourses.slice(0, 7)} heading={heading} navigation={navigationWithId} id={id} swiper />;
};

export default CoursesSection;
