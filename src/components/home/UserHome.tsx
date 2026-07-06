import { Heading, HeroUser, Container, CoursesCategoriesSection, CoursesCategoriesSkeleton, CoursesSection, CoursesSkeleton } from "@/components/index";
import { Suspense } from "react";
import { ChevronNavigation } from "../shared/ArrowNavigation";

const UserHome = async () => {
  return (
    <>
      <section className="userHome-Hero-image relative max-w-full h-[731px] px-6 md:px-16 pb-8 ">
        <HeroUser />
      </section>
      <Container background="bg-white dark:bg-slate-800">
        <Suspense fallback={<CoursesCategoriesSkeleton heading={<Heading title="Courses Category" />} />}>
          <CoursesCategoriesSection navigation={<ChevronNavigation />} />
        </Suspense>
      </Container>
      <Container>
        <Suspense
          fallback={
            <CoursesSkeleton
              heading={
                <Heading
                  title="Recommendation Courses"
                  description="You can find recommendation courses from all course categories and quickly learn more"
                />
              }
            />
          }
        >
          <CoursesSection
            heading={
              <Heading
                title="Recommendation Courses"
                description="You can find recommendation courses from all course categories and quickly learn more"
              />
            }
            navigation={<ChevronNavigation />}
            id="recommendation"
          />
        </Suspense>
      </Container>
      <Container background="bg-white dark:bg-slate-800">
        <Suspense fallback={<CoursesSkeleton heading={<Heading title="Popular Courses" description="Popular courses from all course categories" />} />}>
          <CoursesSection
            heading={<Heading title="Popular Courses" description="Popular courses from all course categories" />}
            navigation={<ChevronNavigation />}
            id="popular"
          />
        </Suspense>
      </Container>
    </>
  );
};

export default UserHome;
