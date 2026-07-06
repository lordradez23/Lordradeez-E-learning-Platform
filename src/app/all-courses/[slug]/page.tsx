import { getCourseBySlugAction } from "@/actions/courseActions";
import { getInstructorBySlugAction } from "@/actions/instructorActions";
import { getReviewsByCourseIdAction } from "@/actions/reviewsActions";
import { Reviews, InstructorCard, LessonsAccordion, RatingProgress, Heading, Container } from "@/components";
import { ChevronNavigation } from "@/components/shared/ArrowNavigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Captions, CircleDollarSign, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseReviews from "./CourseReviews";
import { getUserFromToken } from "@/lib/JWT";
import AddToCartButton from "@/components/shared/AddToCartButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chosenCourse = await getCourseBySlugAction(slug);

  if (!chosenCourse) {
    return {};
  }

  return {
    title: `${chosenCourse?.title} | ${chosenCourse?.instructor.name}`,
    description: chosenCourse?.description.slice(0, 150),
    keywords: [chosenCourse?.title, chosenCourse?.category.title, "online course", "e-learning"],
    openGraph: {
      title: chosenCourse?.title,
      description: chosenCourse?.description.slice(0, 150),
      url: `https://yourplatform.com/courses/${chosenCourse?.slug}`,
      images: [
        {
          url: chosenCourse?.imageUrl,
          width: 800,
          height: 600,
        },
      ],
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Course",
        name: chosenCourse?.title,
        description: chosenCourse?.description,
        provider: {
          "@type": "Organization",
          name: "Online Courses",
          sameAs: "https://example.com",
        },
      }),
    },
  };
}

const CourseDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const user = await getUserFromToken();
  const { slug } = await params;
  const chosenCourse = await getCourseBySlugAction(slug);
  if (!chosenCourse) {
    notFound();
  }
  const chosenReviews = await getReviewsByCourseIdAction(chosenCourse?.id as number);
  const chosenInstructor = await getInstructorBySlugAction(chosenCourse?.instructor.slug as string);
  const ratingBreakdown = [
    { stars: 5, count: chosenCourse?.courseRating?.stars5 },
    { stars: 4, count: chosenCourse?.courseRating?.stars4 },
    { stars: 3, count: chosenCourse?.courseRating?.stars3 },
    { stars: 2, count: chosenCourse?.courseRating?.stars2 },
    { stars: 1, count: chosenCourse?.courseRating?.stars1 },
  ];

  return (
    <>
      <Container>
        <div className="my-6 flex flex-col-reverse md:flex-row justify-evenly gap-4">
          <div className="content flex-1 space-y-6">
            <span>
              <Badge variant="outline" className="text-base md:text-md text-primary relative border-0">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                {chosenCourse?.category.title}
              </Badge>
            </span>
            <h1 className="text-3xl md:text-5xl font-semibold">{chosenCourse?.title}</h1>
            <p className="text-sm md:text-lg text-muted-foreground max-w-full">{chosenCourse?.description}</p>
            <div className="space-x-6">
              <Button variant={"outline"}>
                <Link href={`${slug}/videos`}>Join Now</Link>
              </Button>
              <AddToCartButton course={chosenCourse} />
            </div>
            <div className="flex justify-between lg:items-center flex-col lg:flex-row gap-4">
              <div className="space-y-2">
                <h3 className="text-md text-muted-foreground font-medium">Rating Class</h3>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: Number(Math.ceil(Number(chosenCourse?.ratingCount))) }).map((_, index) => (
                    <Star key={index} fill="#dd7621" size={18} className="text-transparent " />
                  ))}
                  {Array.from({ length: 5 - Number(Math.ceil(Number(chosenCourse?.ratingCount))) }).map((_, index) => (
                    <Star key={index} fill="#bababa" size={18} className="text-transparent " />
                  ))}
                  <p className=" text-xs">
                    {chosenCourse?.ratingCount}
                    <span className="text-muted-foreground"> ({chosenCourse?.ratingTotal})</span>
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-md text-muted-foreground font-medium">Instructor</h3>
                <h4 className="text-sm font-semibold text-primary underline">
                  <Link href={`/instructors/${chosenCourse?.instructor.slug}`}>{chosenCourse?.instructor.name}</Link>
                </h4>
              </div>
              <div className="space-y-2">
                <h3 className="text-md text-muted-foreground font-medium">Translation Video</h3>
                <h4 className="text-sm text-muted-foreground font-semibold flex items-center gap-2">
                  <Captions className="text-muted-foreground" size={18} />
                  <span>{chosenCourse?.translation}</span>
                </h4>
              </div>
              <div className="space-y-2">
                <h3 className="text-md text-muted-foreground font-medium">Price</h3>
                <h4 className="text-sm text-primary font-semibold flex items-center gap-2">
                  <CircleDollarSign className="text-muted-foreground" size={18} />
                  <span>${chosenCourse?.price}</span>
                </h4>
              </div>
            </div>
          </div>
          <div className="flex-1 md:justify-items-end justify-items-center">
            <Image src={chosenCourse?.imageUrl as string} alt="course image" width={400} height={400} className="rounded-md" />
          </div>
        </div>
      </Container>
      <Container background="bg-white dark:bg-slate-800">
        <div className="flex flex-col justify-evenly gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold max-w-96 leading-8">Description Course</h2>
            <p className="text-muted-foreground">{chosenCourse?.description}</p>
          </div>
          <h2 className="text-3xl font-semibold leading-8">What you will learn from this course?</h2>
          <ul className="space-y-4">
            {chosenCourse?.learnings.map((item, index) => (
              <li key={index} className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center gap-1">
                  <span className="w-4 h-4 p-3 text-white text-sm bg-primary rounded-full flex items-center justify-center">{index + 1}</span>
                  {item.title}
                </h3>
                <p className="text-muted-foreground ml-8">{item.description}</p>
                <ul className="space-y-2">
                  {item.items.map((t, index) => (
                    <li key={index} className=" flex items-center gap-1 font-medium ml-8">
                      <span className="w-3 h-3 text-white bg-gray-300 rounded-full flex items-center justify-center"></span>
                      {t.item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container>
        <h2 className="text-3xl font-semibold max-w-96 leading-8">List of Lessons</h2>
        {chosenCourse?.Chapters && <LessonsAccordion data={chosenCourse?.Chapters} />}
      </Container>
      <Container background="bg-white dark:bg-slate-800">
        <div className="my-6 flex flex-col md:flex-row justify-between gap-4 lg:gap-20">
          <div className="space-y-2 flex-1 ">
            <h2 className="text-3xl font-semibold">Rating Class</h2>
            <h3 className="text-6xl font-semibold text-primary">{chosenCourse?.courseRating?.average}</h3>
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-4">
                <div className="flex items-center gap-1 flex-1">
                  {Array.from({ length: Number(Math.ceil(Number(item.stars))) }).map((_, index) => (
                    <Star key={index} fill="#dd7621" size={18} className="text-transparent " />
                  ))}
                </div>
                <div className="flex-1 justify-items-center">
                  <RatingProgress count={((item.count as number) / (chosenCourse?.courseRating?.totalReviews as number)) * 100} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 space-y-2">
            <h2 className="text-3xl font-semibold">Instructor</h2>
            {chosenInstructor && (
              <InstructorCard instructor={chosenInstructor} className="bg-slate-100 rounded-md shadow hover:shadow-xl duration-200" />
            )}
          </div>
        </div>
      </Container>
      <Container>
        <Reviews
          id="reviews"
          heading={<Heading title="Best reviews" />}
          navigation={<ChevronNavigation id="reviews" />}
          reviews={chosenReviews}
          swiper={chosenReviews.length > 5}
        />
        <CourseReviews courseId={chosenCourse?.id} user={user as JwtPayload} />
      </Container>
    </>
  );
};

export default CourseDetails;
