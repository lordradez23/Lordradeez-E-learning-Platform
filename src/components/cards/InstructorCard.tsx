import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Prisma } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";

type InstructorWithCourse = Prisma.InstructorGetPayload<{
  include: { courses: true };
}>;

type InstructorCardProps = {
  instructor: InstructorWithCourse;
  className?: string;
};

const InstructorCard = ({ instructor, className = "" }: InstructorCardProps) => {
  return (
    <div className={cn(`flex flex-col bg-white dark:bg-slate-700 p-6 gap-4 rounded-md ${className}`)}>
      <div className="flex justify-between flex-col lg:flex-row gap-2">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={(instructor.avatarUrl as string) || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
              alt="user avatar"
            />
            <AvatarFallback>
              <Image
                src={(instructor.avatarUrl as string) || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                alt="user avatar"
                width={400}
                height={400}
                className="rounded-full"
              />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium line-clamp-1" title={instructor.name}>
              {instructor.name}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-1" title={instructor.headline || ""}>
              {instructor.headline}
            </p>
          </div>
        </div>
        <Button variant={"outline"}>
          <Link href={`/instructors/${instructor.slug}`}>View Profile</Link>
        </Button>
      </div>
      <p className="text-muted-foreground text-sm leading-5 max-w-full line-clamp-6">{instructor.summary}</p>
    </div>
  );
};

export default InstructorCard;
