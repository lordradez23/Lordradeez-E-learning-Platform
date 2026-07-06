import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { getCourseBySlugAction } from "@/actions/courseActions";
import { notFound } from "next/navigation";
import { getUserFromToken } from "@/lib/JWT";
import CourseComments from "./CourseComments";

export async function ContentArea({ slug }: { slug: string }) {
  const user = await getUserFromToken();

  const chosenCourse = await getCourseBySlugAction(slug);
  if (!chosenCourse) {
    notFound();
  }
  const comments = chosenCourse?.comments.filter((comment) => comment.courseId === chosenCourse?.id);

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <p className="text-muted-foreground">{chosenCourse?.detailDescription}</p>
      </div>
      <Tabs defaultValue="discussion" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>
        <TabsContent value="discussion" className="space-y-6 mt-6">
          <CourseComments comments={comments} user={user as JwtPayload} courseId={chosenCourse?.id} />
        </TabsContent>
        <TabsContent value="quiz" className="mt-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Quiz content would go here</p>
          </div>
        </TabsContent>
      </Tabs>
      <div className="border-t pt-6">
        <div className="text-center space-y-4">
          <h3 className="font-medium">Did you like this lesson?</h3>
          <p className="text-sm text-muted-foreground">Rate this lesson</p>
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} className="text-yellow-400 hover:text-yellow-500 transition-colors">
                <Star className="h-6 w-6 fill-current" />
              </button>
            ))}
          </div>
          <Button className="mt-4">Submit Rate</Button>
        </div>
      </div>
    </div>
  );
}
