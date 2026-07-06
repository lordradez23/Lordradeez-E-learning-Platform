"use client";
import { cn } from "@/lib/utils";
import CourseCard from "./cards/CourseCard";
import ProgressCourseCard from "./cards/ProgressCourseCard";
import { Prisma } from "@/generated/prisma/client";
import SwiperSlider from "@/swiper/SwiperSlider";
import { SwiperSlide } from "swiper/react";

type CourseWithCategory = Prisma.CourseGetPayload<{
  include: { category: true; instructor: true };
}>;

type Enrollments = Prisma.EnrollmentGetPayload<{
  include: { user: true; course: { include: { category: true } } };
}>;

type CourseCardProps = {
  heading?: React.ReactNode;
  navigation?: React.ReactNode;
  courses?: CourseWithCategory[];
  progressCourses?: Enrollments[];
  className?: string;
  swiper?: boolean;
  id?: string;
};

const Courses = ({ heading, navigation, courses, progressCourses, className = "", swiper = false, id = "" }: CourseCardProps) => {
  return (
    <>
      {heading}
      <div className={cn(`flex justify-evenly flex-wrap gap-6 my-6 ${className}`)}>
        {(courses && courses.length > 0) || (progressCourses && progressCourses.length > 0) ? (
          <>
            {courses && swiper ? (
              <SwiperSlider id={id}>
                {courses.map((course) => (
                  <SwiperSlide key={course.slug}>
                    <CourseCard course={course} />
                  </SwiperSlide>
                ))}
              </SwiperSlider>
            ) : (
              courses && !swiper && courses.map((course) => <CourseCard course={course} key={course.slug} />)
            )}

            {progressCourses && progressCourses.map((course) => <ProgressCourseCard key={course.id} course={course} />)}
          </>
        ) : (
          <p className="text-center text-muted-foreground">No courses yet</p>
        )}
      </div>
      {navigation && navigation}
    </>
  );
};

export default Courses;
