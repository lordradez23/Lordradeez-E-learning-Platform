import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RatingProgress from "../shared/RatingProgress";
import { Prisma } from "@/generated/prisma/client";

type Enrollments = Prisma.EnrollmentGetPayload<{
  include: { user: true; course: { include: { category: true } } };
}>;

type CourseCardProps = {
  course: Enrollments;
};

const ProgressCourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link href={`/all-courses/${course.course.slug}?id=${course.id}`}>
      <div className="flex flex-col bg-slate-100 dark:bg-slate-700 w-64 max-w-full pb-6 gap-4 rounded-md shadow hover:shadow-xl duration-200">
        <Image src={course.course.imageUrl} alt="course image" width={400} height={400} className="rounded-md max-w-full" />
        <div className="space-y-2 px-4">
          <Badge variant="outline" className="text-xs text-primary relative border-0 -ml-2">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
            <span>{course.course.category.title}</span>
          </Badge>
          <h3 className="font-medium line-clamp-1">{course.course.title}</h3>
          <div>
            <RatingProgress count={course.progress > 0 ? (course.finishedLessons / course.progress) * 100 : 0} className="h-2" />
            <span className="text-muted-foreground text-xs">
              {course.finishedLessons}/{course.progress} Lessons
            </span>
          </div>
          <Button variant={"outline"}>Continue</Button>
        </div>
      </div>
    </Link>
  );
};

export default ProgressCourseCard;
