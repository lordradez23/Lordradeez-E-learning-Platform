import { getAllInstructorsAction } from "@/actions/instructorActions";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import Link from "next/link";

const page = async () => {
  const instructors = await getAllInstructorsAction();
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold">All Instructors</h1>
        </div>

        {/* Mentors Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-7 gap-4 p-4 bg-muted font-medium text-sm">
            <div>Photo</div>
            <div>Name Mentor</div>
            <div>Email</div>
            <div>Total Course</div>
            <div>Total Students</div>
            <div>Income</div>
            <div>Action</div>
          </div>

          <div className="divide-y">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="grid grid-cols-7 gap-4 p-4 items-center">
                <div>
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={(instructor.avatarUrl as string) || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                      alt={instructor.name}
                    />
                    <AvatarFallback>{instructor.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="font-medium">{instructor.name}</div>
                <div className="text-muted-foreground">{instructor.websiteUrl}</div>
                <div>{instructor.courses.length}</div>
                <div>{instructor.totalStudents}</div>
                <div className="font-semibold">$800</div>
                <div>
                  <Link
                    href={`/admin/instructors/${instructor.slug}`}
                    className="flex items-center justify-center bg-primary/10 group text-primary hover:bg-primary hover:text-white rounded-md px-2 py-3"
                  >
                    <Eye />
                    <span className="ml-2 text-sm text-primary cursor-pointer group-hover:text-white ">View</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
