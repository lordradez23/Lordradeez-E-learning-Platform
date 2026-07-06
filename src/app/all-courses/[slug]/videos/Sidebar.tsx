import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCourseBySlugAction } from "@/actions/courseActions";
import { notFound } from "next/navigation";
import { LessonsAccordion } from "@/components";

export async function Sidebar({ slug }: { slug: string }) {
  const chosenCourse = await getCourseBySlugAction(slug);
  if (!chosenCourse) {
    notFound();
  }
  return (
    <div className="w-full md:w-80 bg-background border-r border-border">
      <div className="p-4">
        <Button variant="ghost" className="mb-4 p-0 h-auto text-muted-foreground hover:text-foreground">
          <Link href={`/all-courses/${slug}`} className="flex items-center text-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back</span>
          </Link>
        </Button>
        <h2 className="text-lg font-semibold mb-6">{chosenCourse.title}</h2>
        <div className="space-y-2">{chosenCourse?.Chapters && <LessonsAccordion data={chosenCourse?.Chapters} />}</div>
      </div>
    </div>
  );
}
