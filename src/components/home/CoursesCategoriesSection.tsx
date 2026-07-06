import React from "react";
import { getCategoriesAction } from "@/actions/categoryActions";
import { CoursesCategories, Heading } from "@/components";
import { ArrowNavigation } from "@/components/shared/ArrowNavigation";

const CoursesCategoriesSection = async ({ id = "category", navigation }: { id?: string; navigation?: React.ReactElement<{ id: string }> }) => {
  const categories = await getCategoriesAction();
  const navigationWithId = navigation ? React.cloneElement(navigation, { id }) : <ArrowNavigation id={id} />;

  return (
    <CoursesCategories heading={<Heading title="Courses Category" />} categories={categories} navigation={navigationWithId} id="category" swiper />
  );
};

export default CoursesCategoriesSection;
