import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Link from "next/link";
import { Prisma } from "@/generated/prisma/client";
import AddToCartButton from "../shared/AddToCartButton";
import { categoryBadgeColors } from "@/constants";

type CourseWithCategory = Prisma.CourseGetPayload<{
  include: { category: true };
}>;

type CourseCardProps = {
  course: CourseWithCategory;
};

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div className="flex flex-col w-64 gap-4 pb-6 duration-200 rounded-md shadow bg-card text-card-foreground hover:shadow-xl">
      <Link href={`/all-courses/${course.slug}`}>
        <Image src={course?.imageUrl} alt="course image" width={400} height={400} className="object-cover max-w-full rounded-md" />
      </Link>
      <div className="px-4 space-y-2">
        <Badge
          className={`text-white ${categoryBadgeColors[course.category.title as keyof typeof categoryBadgeColors] || "bg-blue-500"}`}
        >{`${course.category.title}`}</Badge>

        <h3 className="font-medium line-clamp-1">
          <Link href={`/all-courses/${course.slug}`}>{course.title} </Link>
        </h3>
        <p className="text-xs text-muted-foreground">{course.duration}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: Number(Math.ceil(Number(course.ratingCount))) }).map((_, index) => (
            <Star key={index} fill="#dd7621" size={18} className="text-transparent " />
          ))}
          {Array.from({ length: 5 - Number(Math.ceil(Number(course.ratingCount))) }).map((_, index) => (
            <Star key={index} fill="#bababa" size={18} className="text-transparent " />
          ))}
          <p className="text-xs">
            {course.ratingCount}
            <span className="text-muted-foreground"> ({course.ratingTotal})</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <AddToCartButton course={course} />
          <strong>${course.price}</strong>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
