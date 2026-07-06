"use client";
import SwiperSlider from "@/swiper/SwiperSlider";
import CategoryCard from "./cards/CategoryCard";
import { Prisma } from "@/generated/prisma/client";
import { SwiperSlide } from "swiper/react";

type CategoryWithCourses = Prisma.CategoryGetPayload<{
  include: { courses: true };
}>;

interface Props {
  searchParams?: { category?: string };
  heading: React.ReactNode;
  navigation?: React.ReactNode;
  categories: CategoryWithCourses[];
  swiper?: boolean;
  id?: string;
}

const CoursesCategories = ({ heading, navigation, categories, swiper = false, id = "" }: Props) => {
  return (
    <>
      {heading}
      <div className="flex justify-evenly flex-wrap gap-6">
        {categories && categories.length > 0 ? (
          categories && swiper ? (
            <SwiperSlider id={id}>
              {categories.map((category) => (
                <SwiperSlide key={category.slug}>
                  <CategoryCard key={category.id} category={category} />
                </SwiperSlide>
              ))}
            </SwiperSlider>
          ) : (
            categories && !swiper && categories.slice(0, 5).map((category) => <CategoryCard key={category.id} category={category} />)
          )
        ) : (
          <p className="text-center text-muted-foreground">No categories yet</p>
        )}
      </div>
      {navigation && navigation}
    </>
  );
};

export default CoursesCategories;
