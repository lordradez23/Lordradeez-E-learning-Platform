import { getCoursesAction } from "@/actions/courseActions";
import DiscussionClient from "./DiscussionClient";

const Discussion = async () => {
  const courses = await getCoursesAction();
  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1">
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Discussion</h1>
          </div>
            <DiscussionClient courses={courses} />
        </main>
      </div>
    </div>
  );
};

export default Discussion;
