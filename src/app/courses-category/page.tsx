import { getCategoriesAction } from "@/actions/categoryActions";
import { getCoursesAction } from "@/actions/courseActions";
import { Courses, CoursesCategories } from "@/components";
import { ChevronNavigation } from "@/components/shared/ArrowNavigation";
import Heading from "@/components/shared/Heading";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata={
  title:"Courses Category",
  description:"Discover high-quality online courses across various categories. Learn at your own pace from industry-leading instructors.",
  keywords:["online courses", "e-learning", "best instructors", "learn online", "programming courses", "design courses", "Lordradeez Academy"],
  alternates: {
    canonical: "https://lordradeez-academy.vercel.app/courses-category",
  },
}

const CoursesCategory = async () => {
  const allCourses = await getCoursesAction();
  const categories = await getCategoriesAction();

  return (
    <>
      <section className="bg-white dark:bg-slate-800 px-6 md:px-16 py-10">
        <div className="container mx-auto space-y-6 my-6">
          <span className="text-muted-foreground">Find the course category you want</span>
          <CoursesCategories
            heading={
              <Heading
                title="Courses Category"
                cta={
                  <Button variant="link">
                    <Link href="/all-courses">See All</Link>
                  </Button>
                }
              />
            }
            categories={categories}
            navigation={<ChevronNavigation id="category" />}
            id="category"
            swiper
          />
        </div>
      </section>
      <section className="px-6 md:px-16 py-10">
        <div className="container mx-auto space-y-6 my-6">
          <Courses
            heading={<Heading title="You can also study other categories" />}
            navigation={<ChevronNavigation />}
            courses={allCourses.slice(0, 9)}
            swiper
          />
        </div>
      </section>
    </>
  );
};

export default CoursesCategory;
