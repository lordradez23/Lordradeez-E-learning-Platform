"use client";

import { useForm, useFieldArray, Control, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, X, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { courseSchema, CourseSchemaType } from "@/schema/courseSchema";
import { Prisma } from "@/generated/prisma/client";
import { createCourseAction, updateCourseAction } from "@/actions/courseActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Category = Prisma.CategoryGetPayload<Record<string, never>>;
type Instructor = Prisma.InstructorGetPayload<Record<string, never>>;
type CourseWithRelations = Prisma.CourseGetPayload<{
  include: { Chapters: { include: { details: true } } };
}>;

interface CourseFormProps {
  initialData?: CourseWithRelations | null;
  categories: Category[];
  instructors: Instructor[];
}

const CourseForm = ({ initialData, categories, instructors }: CourseFormProps) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          imageUrl: initialData.imageUrl,
          categoryId: initialData.categoryId,
          instructorId: initialData.instructorId,
          translation: initialData.translation,
          duration: initialData.duration,
          lectures: initialData.lectures,
          price: initialData.price,
          badgeBg: initialData.badgeBg,
          detailDescription: initialData.detailDescription,
          Chapters: initialData.Chapters.map((chapter) => ({
            topic: chapter.topic,
            duration: chapter.duration,
            details: chapter.details.map((lesson) => ({
              title: lesson.title,
              duration: lesson.duration,
              video: lesson.video,
            })),
          })),
        }
      : {
          title: "",
          description: "",
          imageUrl: "",
          translation: "English",
          duration: "",
          lectures: 0,
          price: 0,
          badgeBg: "#3b82f6",
          detailDescription: "",
          Chapters: [{ topic: "Introduction", duration: "1h", details: [{ title: "Welcome", duration: "5m", video: "https://youtube.com/..." }] }],
        },
  });

  const { fields: chapterFields, append: appendChapter, remove: removeChapter } = useFieldArray({
    control,
    name: "Chapters",
  });

  const onSubmit = (data: CourseSchemaType) => {
    startTransition(async () => {
      let res;
      if (initialData) {
        res = await updateCourseAction(initialData.id, data);
      } else {
        res = await createCourseAction(data);
      }

      if (res?.success) {
        toast.success(res.message);
        router.push("/admin/courses");
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-background flex flex-col">
      <main className="p-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-10">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-6">
                <CardContent className="space-y-6 p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Course Name</Label>
                      <Input id="title" {...register("title")} placeholder="UI/UX Design For Beginner" />
                      {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="categoryId">Course Category</Label>
                      <Select
                        defaultValue={initialData?.categoryId?.toString()}
                        onValueChange={(value) => setValue("categoryId", parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                              {cat.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                    <Label htmlFor="instructorId">Instructor</Label>
                      <Select
                        defaultValue={initialData?.instructorId?.toString()}
                        onValueChange={(value) => setValue("instructorId", parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Instructor" />
                        </SelectTrigger>
                        <SelectContent>
                          {instructors.map((ins) => (
                            <SelectItem key={ins.id} value={ins.id.toString()}>
                              {ins.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.instructorId && <p className="text-sm text-red-500">{errors.instructorId.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Course Price ($)</Label>
                      <Input id="price" type="number" step="0.01" {...register("price", { valueAsNumber: true })} placeholder="99.99" />
                      {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="duration">Total Duration</Label>
                        <Input id="duration" {...register("duration")} placeholder="20h 30m" />
                        {errors.duration && <p className="text-sm text-red-500">{errors.duration.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="lectures">Total Lectures</Label>
                        <Input id="lectures" type="number" {...register("lectures", { valueAsNumber: true })} placeholder="50" />
                        {errors.lectures && <p className="text-sm text-red-500">{errors.lectures.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="translation">Translation</Label>
                        <Input id="translation" {...register("translation")} placeholder="English, Arabic, ..." />
                        {errors.translation && <p className="text-sm text-red-500">{errors.translation.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="badgeBg">Badge Color (Hex)</Label>
                        <div className="flex gap-2">
                            <Input id="badgeBg" {...register("badgeBg")} placeholder="#3b82f6" />
                            <div className="w-10 h-10 rounded border" style={{ backgroundColor: watch("badgeBg") || "#ccc" }} />
                        </div>
                        {errors.badgeBg && <p className="text-sm text-red-500">{errors.badgeBg.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Course Thumbnail URL</Label>
                    <Input id="imageUrl" {...register("imageUrl")} placeholder="https://example.com/image.jpg" />
                    {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea id="description" {...register("description")} placeholder="Briefly describe the course" className="min-h-[80px]" />
                    {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="detailDescription">Detailed Description</Label>
                    <Textarea id="detailDescription" {...register("detailDescription")} placeholder="In-depth details about the course" className="min-h-[150px]" />
                    {errors.detailDescription && <p className="text-sm text-red-500">{errors.detailDescription.message}</p>}
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-6 mt-6">
                <CardContent className="space-y-6 p-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Course Modules (Chapters)</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendChapter({ topic: "", duration: "", details: [] })}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Chapter
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {chapterFields.map((chapter, chapterIndex) => (
                      <Collapsible
                        key={chapter.id}
                        open={expandedSection === chapterIndex}
                        onOpenChange={() => setExpandedSection(expandedSection === chapterIndex ? null : chapterIndex)}
                      >
                        <div className="border rounded-lg overflow-hidden">
                          <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between w-full p-4 bg-muted/30 cursor-pointer">
                              <div className="flex items-center gap-3">
                                {expandedSection === chapterIndex ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                <span className="font-semibold text-sm">Chapter {chapterIndex + 1}: {watch(`Chapters.${chapterIndex}.topic`) || "New Chapter"}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      removeChapter(chapterIndex);
                                  }}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="p-4 border-t bg-background space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Chapter Topic</Label>
                                  <Input {...register(`Chapters.${chapterIndex}.topic` as const)} placeholder="e.g., Introduction to UI" />
                                </div>
                                <div className="space-y-2">
                                  <Label>Chapter Duration</Label>
                                  <Input {...register(`Chapters.${chapterIndex}.duration` as const)} placeholder="e.g., 1h 30m" />
                                </div>
                              </div>

                              <LessonsField chapterIndex={chapterIndex} control={control} register={register} />
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>
                    ))}
                  </div>
                </CardContent>
              </TabsContent>

              <div className="flex justify-end gap-4 pt-6 mt-6 border-t">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving..." : initialData ? "Update Course" : "Create Course"}
                </Button>
              </div>
            </Tabs>
          </CardHeader>
        </Card>
      </main>
    </form>
  );
};

// Separate component for internal field array to avoid re-rendering the whole form too often
const LessonsField = ({ chapterIndex, control, register }: { chapterIndex: number; control: Control<CourseSchemaType>; register: UseFormRegister<CourseSchemaType> }) => {
  const { fields: lessonFields, append: appendLesson, remove: removeLesson } = useFieldArray({
    control,
    name: `Chapters.${chapterIndex}.details`,
  });

  return (
    <div className="space-y-3 pl-4 border-l-2 border-muted mt-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium">Lessons</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={() => appendLesson({ title: "", duration: "", video: "" })}
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Lesson
        </Button>
      </div>

      {lessonFields.map((lesson, lessonIndex) => (
        <div key={lesson.id} className="p-3 bg-muted/10 rounded border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Lesson {lessonIndex + 1}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-500 h-6 w-6 p-0"
              onClick={() => removeLesson(lessonIndex)}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Lesson Title</Label>
              <Input className="h-8 text-sm" {...register(`Chapters.${chapterIndex}.details.${lessonIndex}.title` as const)} placeholder="e.g., Setting up the project" />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Duration</Label>
              <Input className="h-8 text-sm" {...register(`Chapters.${chapterIndex}.details.${lessonIndex}.duration` as const)} placeholder="e.g., 10m" />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label className="text-xs">Video URL</Label>
              <Input className="h-8 text-sm" {...register(`Chapters.${chapterIndex}.details.${lessonIndex}.video` as const)} placeholder="https://youtube.com/..." />
            </div>
          </div>
        </div>
      ))}

      {lessonFields.length === 0 && (
        <p className="text-xs text-muted-foreground italic text-center py-2">No lessons added to this chapter yet.</p>
      )}
    </div>
  );
};

export default CourseForm;
