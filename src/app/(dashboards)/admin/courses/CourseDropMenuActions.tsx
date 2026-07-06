"use client"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Prisma } from "@/generated/prisma/client";
import { deleteCourseAction } from "@/actions/courseActions";
import { useTransition } from "react";
import { toast } from "react-toastify";

type CourseWithCategory = Prisma.CourseGetPayload<{
  include: { category: true; instructor: true };
}>;

const CourseDropMenuActions = ({ course }: { course: CourseWithCategory }) => {
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteCourseAction(course.id);
      if (res?.success) {
        toast.success("Course deleted successfully");
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex items-center gap-2">
          <Link href={`/all-courses/${course.slug}`} className="flex items-center gap-2 w-full">
            <Eye className="w-4 h-4" />
            View
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/admin/courses/edit-course/${course.slug}`} className="flex items-center gap-2 w-full">
            <Edit className="w-4 h-4" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 text-red-600" disabled={isPending} onClick={handleDelete}>
          <Trash2 className="w-4 h-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseDropMenuActions;
