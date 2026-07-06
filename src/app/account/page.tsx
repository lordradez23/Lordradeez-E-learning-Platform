import { getEnrollmentsAction } from "@/actions/enrollmentsActions";
import { Courses, Heading } from "@/components";
import { Button } from "@/components/ui/button";
import { getUserFromToken } from "@/lib/JWT";

const MyClass = async () => {
  const user = await getUserFromToken();
  if (!user) return null;
  const enrollments = await getEnrollmentsAction(user.id);

  return (
    <div className="space-y-6">
      <Heading title="My Class" description="Continue to learn with new knowledge" />
      <div className="flex gap-4">
        <Button>All</Button>
        <Button variant={"outline"}>Started</Button>
        <Button variant={"outline"}>Finished</Button>
      </div>
      <Courses progressCourses={enrollments} className="justify-center lg:justify-start" />
    </div>
  );
};

export default MyClass;
