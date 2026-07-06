import { HeroVisitor, WhyUs, Banner, Container, Heading, CoursesCategoriesSkeleton, CoursesSkeleton, NewsSkeleton, ReviewsSkeleton, CoursesCategoriesSection, CoursesSection, NewsSection, ReviewsSection } from "@/components/index";
import { Suspense } from "react";
import { ArrowNavigation } from "../shared/ArrowNavigation";

const VisitorHome = async () => {
  return (
    <>
      <Container>
        <div className="flex flex-col-reverse md:flex-row justify-evenly items-center gap-12">
          <HeroVisitor />
        </div>
      </Container>
      <Container background="bg-white dark:bg-slate-800">
        <Suspense fallback={<CoursesCategoriesSkeleton heading={<Heading title="Courses Category" />} />}>
          <CoursesCategoriesSection />
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
            navigation={<ArrowNavigation />}
          />
        </Suspense>
      </Container>
      <Container background="bg-white dark:bg-slate-800">
        <WhyUs />
      </Container>
      <Container>
        <Suspense
          fallback={
            <ReviewsSkeleton
              heading={
                <Heading title="What our students say" description="Find out what experiences and what they have to say about the course with us" />
              }
            />
          }
        >
          <ReviewsSection />
        </Suspense>
      </Container>
      <Container background="bg-white dark:bg-slate-800">
        <Suspense fallback={<NewsSkeleton heading={<Heading title="News for you" />} />}>
          <NewsSection />
        </Suspense>
      </Container>
      <Container background="bg-white dark:bg-slate-800">
        <Banner
          image="home-banner-image"
          title="Prove it right now"
          description="What are you waiting for? let's join us and get new knowledge and prove it now"
        />
      </Container>
    </>
  );
};

export default VisitorHome;
