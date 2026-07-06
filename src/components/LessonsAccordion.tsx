"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDownIcon, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Prisma } from "@/generated/prisma/client";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { usePathname } from "next/navigation";
import { getBasePath } from "@/lib/utils";
import ActiveLink from "./shared/ActiveLink";

type ChapterWithLessons = Prisma.ChapterGetPayload<{
  include: { details: true };
}>;

interface AccordionProps {
  data: ChapterWithLessons[];
}

const LessonsAccordion = ({ data }: AccordionProps) => {
  const pathname = usePathname();
  const videosPath = pathname.includes("videos");
  return (
    <Accordion type="single" collapsible className="w-full">
      {data.map((topic, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="flex justify-between">
            <h3 className="flex items-center gap-1 text-lg">
              <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
              <span>{topic.topic}</span>
            </h3>
            <h3 className="text-md text-muted-foreground">{topic.duration}</h3>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="pl-4 space-y-4">
              {topic.details.map((lesson, lessonIndex) => (
                <li key={lessonIndex}>
                  <div className="flex items-center gap-2">
                    {!videosPath ? (
                      <div className="w-full flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Button size={"icon"} className="bg-primary rounded-full w-2 h-2 p-3">
                            <Play className="w-1 h-1" fill="#fff" />
                          </Button>
                          <span className="text-muted-foreground hover:text-primary">
                            {lessonIndex + 1}. {lesson.title}
                          </span>
                        </div>
                        <span className="text-muted-foreground">{lesson.duration}</span>
                      </div>
                    ) : (
                      <>
                        <Checkbox id={lesson.title} />
                        <Label htmlFor={lesson.title}>
                          <ActiveLink href={`${getBasePath(pathname)}/${lesson.slug}`} activeClassName="text-primary">
                            {lessonIndex + 1}. {lesson.title}
                          </ActiveLink>
                        </Label>
                        <span className="text-muted-foreground">{lesson.duration}</span>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default LessonsAccordion;
