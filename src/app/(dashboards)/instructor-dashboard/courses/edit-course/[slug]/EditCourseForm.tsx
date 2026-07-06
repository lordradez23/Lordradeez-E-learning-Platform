"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Upload, Edit, X, Plus } from "lucide-react";
import { Prisma } from "@/generated/prisma/client";

type CourseWithCategory = Prisma.CourseGetPayload<{
  include: { category: true; instructor: true };
}>;

type CategoryWithCourses = Prisma.CategoryGetPayload<{
  include: { courses: true };
}>;

const EditCourseForm = ({ course, categories }: { course: CourseWithCategory; categories: CategoryWithCourses[] }) => {
  const [expandedSection, setExpandedSection] = useState("userResearch");

  const sections = [
    {
      id: "userResearch",
      title: "User Research",
      items: ["Introduction", "Emphasize", "Problem Solve Methods", "Usability Testing"],
    },
    {
      id: "wireframe",
      title: "Wireframe",
      items: [],
    },
    {
      id: "figmaBasic",
      title: "Figma Basic",
      items: [],
    },
  ];

  const lessons = [
    { title: "Introduction", editable: true },
    { title: "Emphasize", editable: true },
    { title: "Problem Solve Methods", editable: true },
    { title: "Usability Testing", editable: true },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1">
        <main className="p-6">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-10">
                  <TabsTrigger value="basic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Basic Information
                  </TabsTrigger>
                  <TabsTrigger value="lesson" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Lesson
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6 mt-6">
                  <CardContent className="space-y-6 p-0">
                    {/* Course Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="courseName">Course Name</Label>
                        <Input
                          id="courseName"
                          placeholder="UI/UX Design For Beginner"
                          value={course.title}
                          onChange={(e) => console.log(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="courseCategory">Course Category</Label>
                        <Select defaultValue={course.category.title}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem value={category.title} key={category.slug}>
                                {category.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="coursePrice">Course Price</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 border-input rounded-l-md">
                            $
                          </span>
                          <Input
                            id="coursePrice"
                            placeholder="99"
                            className="rounded-l-none"
                            value={course.price}
                            onChange={(e) => console.log(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Add Coupon */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">Add Coupon</h3>
                        <span className="text-sm text-muted-foreground">(Optional)</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="couponCode">Coupon Code</Label>
                          <Input id="couponCode" placeholder="Example: UI/UX2021" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expiredDate">Expired date</Label>
                          <Select defaultValue="july-21-2021">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="july-21-2021">July, 21 2021</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="discountPrice">Discount Price</Label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 border-input rounded-l-md">
                              $
                            </span>
                            <Input id="discountPrice" placeholder="50" className="rounded-l-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add Discount */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">Add Discount</h3>
                        <span className="text-sm text-muted-foreground">(Optional)</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiredDateDiscount">Expired date</Label>
                          <Select defaultValue="july-21-2021">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="july-21-2021">July, 21 2021</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="discountPricePercent">Discount Price</Label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 border-input rounded-l-md">
                              %
                            </span>
                            <Input id="discountPricePercent" defaultValue="50" className="rounded-l-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Course Description */}
                    <div className="space-y-2">
                      <Label htmlFor="courseDescription">Course Description</Label>
                      <Textarea id="courseDescription" placeholder="Add a short description of this course" className="min-h-[120px]" />
                    </div>

                    {/* Upload Course Thumbnail */}
                    <div className="space-y-2">
                      <Label>Upload Course Thumbnail</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="w-8 h-8 text-muted-foreground" />
                          <p className="text-muted-foreground">Upload file or Drag and Drop</p>
                          <Button variant="default" className="mt-2">
                            Browse
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Sections */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Sections</h3>
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Section
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {sections.map((section) => (
                          <Collapsible
                            key={section.id}
                            open={expandedSection === section.id}
                            onOpenChange={() => setExpandedSection(expandedSection === section.id ? "" : section.id)}
                          >
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted/50 rounded-lg hover:bg-muted">
                              <div className="flex items-center gap-2">
                                {expandedSection === section.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                <span className="font-medium">{section.title}</span>
                              </div>
                              Edit
                            </CollapsibleTrigger>
                            <CollapsibleContent className="ml-6 mt-2 space-y-2">
                              {section.items.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-background rounded border">
                                  <span className="text-sm">{item}</span>
                                  <div className="flex gap-1">
                                    <Button variant="ghost" size="sm" className="text-primary h-8 w-8 p-0">
                                      <Edit className="w-3 h-3" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-red-500 h-8 w-8 p-0">
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-center pt-6">
                      <Button className="px-8">Save</Button>
                    </div>
                  </CardContent>
                </TabsContent>

                <TabsContent value="lesson" className="space-y-6 mt-6">
                  <CardContent className="space-y-8 p-0">
                    {/* Add Lesson Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Add Lesson</h3>

                      {/* Create lesson title */}
                      <div className="space-y-2">
                        <Input placeholder="Create lesson title" className="w-full" />
                      </div>

                      {/* Lesson Section */}
                      <div className="space-y-2">
                        <Label>Lesson Section</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose Lesson Section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user-research">User Research</SelectItem>
                            <SelectItem value="wireframe">Wireframe</SelectItem>
                            <SelectItem value="figma-basic">Figma Basic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Lessons */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">lessons</h3>
                          <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Lesson
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <div className="font-medium text-sm text-muted-foreground mb-2">User Research</div>
                          {lessons.map((lesson, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-background rounded border">
                              <span className="text-sm">{lesson.title}</span>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm" className="text-primary h-8 w-8 p-0">
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-500 h-8 w-8 p-0">
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Add video */}
                      <div className="space-y-4">
                        <h4 className="font-medium">Add video</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <Button variant="outline" className="flex items-center gap-2">
                            Add File
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" className="flex items-center gap-2">
                            Add Video
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Input placeholder="Video Link: www.youtube.com/course" />
                          <Input placeholder="Reference: www.msdn.com/html" />
                        </div>
                        <div className="text-center text-muted-foreground">or</div>
                      </div>

                      {/* Add article */}
                      <div className="space-y-4">
                        <h4 className="font-medium">Add article</h4>
                        <div className="border rounded-lg">
                          <Textarea placeholder="Create article or Upload files here" className="min-h-[200px] border-0 resize-none" />
                          <div className="border-t p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                B
                              </Button>
                              <Button variant="ghost" size="sm">
                                U
                              </Button>
                              <Button variant="ghost" size="sm">
                                I
                              </Button>
                              <Button variant="ghost" size="sm">
                                A
                              </Button>
                              <Button variant="ghost" size="sm">
                                Aa
                              </Button>
                              <div className="w-px h-4 bg-border mx-2" />
                              <Button variant="ghost" size="sm">
                                ≡
                              </Button>
                              <Button variant="ghost" size="sm">
                                ≡
                              </Button>
                              <Button variant="ghost" size="sm">
                                ≡
                              </Button>
                              <Button variant="ghost" size="sm">
                                ≡
                              </Button>
                              <div className="w-px h-4 bg-border mx-2" />
                              <Button variant="ghost" size="sm">
                                •
                              </Button>
                              <Button variant="ghost" size="sm">
                                1.
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                📎
                              </Button>
                              <Button variant="ghost" size="sm">
                                🖼️
                              </Button>
                              <Button variant="ghost" size="sm">
                                😊
                              </Button>
                              <Button className="px-6">Save</Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full md:w-auto">Save Lesson</Button>
                    </div>

                    {/* Add Translation Video or Article */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Add Translation Video or Article</h3>
                      <div className="border rounded-lg p-6 text-center text-muted-foreground">Add translation to your lesson</div>
                      <Button variant="outline" className="w-full md:w-auto">
                        Save Translation
                      </Button>
                    </div>

                    {/* Add Question */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Add Question</h3>

                      <Card>
                        <CardContent className="p-6 space-y-4">
                          <h4 className="font-medium">Make a Question</h4>

                          <Tabs defaultValue="question" className="w-full">
                            <TabsList>
                              <TabsTrigger value="question" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                                Question
                              </TabsTrigger>
                              <TabsTrigger value="answer">Answer</TabsTrigger>
                            </TabsList>

                            <TabsContent value="question" className="space-y-4 mt-4">
                              <Select defaultValue="essay">
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="essay">Essay</SelectItem>
                                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                  <SelectItem value="true-false">True/False</SelectItem>
                                </SelectContent>
                              </Select>

                              <div className="space-y-3">
                                {[1, 2, 3, 4, 5].map((index) => (
                                  <div key={index} className="flex items-center gap-3">
                                    <Input placeholder="How to prioritize the main problems in user research?" className="flex-1" />
                                    <Button variant="ghost" size="sm" className="text-red-500">
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>

                              <div className="flex items-center gap-3 mt-4">
                                <Input placeholder="Make a question here" className="flex-1" />
                                <Button size="sm" className="w-8 h-8 rounded-full p-0">
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </TabsContent>

                            <TabsContent value="answer" className="mt-4">
                              <div className="text-center py-8 text-muted-foreground">Answer content will be here</div>
                            </TabsContent>
                          </Tabs>
                        </CardContent>
                      </Card>

                      <Button className="w-full md:w-auto">Save Question</Button>
                    </div>
                  </CardContent>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default EditCourseForm;
