import { getCoursesAction } from "@/actions/courseActions";
import { Courses, Heading, Container } from "@/components";
import CoursesFilter from "./CoursesFilter";
import PaginationComponent from "@/components/shared/PaginationComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Courses",
  description:
    "Explore a wide range of courses across various categories at Lordradeez Academy. Enhance your skills and knowledge with our expert-led courses.",
  keywords: ["online courses", "e-learning", "best instructors", "learn online", "programming courses", "design courses", "Lordradeez Academy"],
  alternates: {
    canonical: "https://lordradeez-academy.vercel.app/all-courses",
  },
};

export default async function AllCourses(Props: { searchParams: Promise<{ category?: string; page?: string; search?: string }> }) {
  const searchParams = await Props.searchParams;
  const selectedCategory = searchParams.category || "All";
  const searchQuery = searchParams.search || "";
  const allCourses = await getCoursesAction();
  const allCategories = ["All", ...new Set(allCourses.map((course) => course.category.title))];

  // Filter & Search
  let filteredCourses = allCourses;
  if (selectedCategory !== "All") {
    filteredCourses = filteredCourses.filter((course) => course.category.title === selectedCategory);
  }
  if (searchQuery) {
    filteredCourses = filteredCourses.filter((course) => course.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  // Pagination
  const COURSES_PER_PAGE = 10;
  const CURRENT_PAGE = Number(searchParams.page) || 1;
  const coursesLength = filteredCourses.length;
  const pages = Math.ceil(coursesLength / COURSES_PER_PAGE);
  const start = (CURRENT_PAGE - 1) * COURSES_PER_PAGE;
  const paginatedCourses = filteredCourses.slice(start, start + COURSES_PER_PAGE);

  return (
    <>
      <Container>
        <Courses
          heading={<Heading title={`${selectedCategory} Courses`} cta={<CoursesFilter selected={selectedCategory} options={allCategories} />} />}
          courses={paginatedCourses}
        />
        <PaginationComponent pages={pages} currentPage={CURRENT_PAGE} category={selectedCategory} />
      </Container>
    </>
  );
}
