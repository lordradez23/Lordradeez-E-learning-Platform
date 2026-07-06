
import { getCoursesAction } from "@/actions/courseActions";
import ReviewsClient from "./ReviewsClient";

const ReviewCourse = async () => {
  const courses = await getCoursesAction();

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1">
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Review Course</h1>
          </div>
          <ReviewsClient courses={courses} />
        </main>
      </div>
    </div>
  );
};

export default ReviewCourse;
