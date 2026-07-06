import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import Image from "next/image";
import { getCoursesAction } from "@/actions/courseActions";
import CourseDropMenuActions from "./CourseDropMenuActions";
import Link from "next/link";

const AllCourse = async () => {
  const courses = await getCoursesAction();
  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1">
        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">All Courses</h1>
                <p className="text-muted-foreground">Manage all your courses</p>
              </div>
              <Button className="text-white">
                <Link href="/admin/courses/add-course" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Course
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search courses..." className="pl-10" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => {
                const students = course.enrollments.map((enrollment) => enrollment.user);
                return (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted relative">
                      <Image width={400} height={400} src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3">
                        <CourseDropMenuActions course={course} />
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg font-semibold line-clamp-1">{course.title}</CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Category:</span>
                        <Badge variant="outline">{course.category.title}</Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Students:</span>
                        <span className="font-medium">{students.length}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-semibold text-primary">${course.price}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Created:</span>
                        <span>{course.createdAt.toDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex items-center justify-center pt-6">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="default" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllCourse;
