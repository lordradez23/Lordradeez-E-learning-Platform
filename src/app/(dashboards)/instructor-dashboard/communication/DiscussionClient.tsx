"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Trash2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile } from "lucide-react";
import { Prisma } from "@/generated/prisma";
import { useTransition } from "react";
import { createCommentAction, deleteCommentAction } from "@/actions/commentActions";
import { toast } from "react-toastify";

type CourseWithCategory = Prisma.CourseGetPayload<{
  include: { category: true; instructor: true; comments: { include: { user: true } } };
}>;

type User = Prisma.UserGetPayload<{
  include: { comments: { include: { course: true } } };
}>;

const DiscussionClient = ({ courses }: { courses: CourseWithCategory[] }) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseWithCategory | null>(null);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    getUser();
  }, []);

  const handleSubmit = () => {
    if (!selectedCourse || !commentText.trim() || !user) return;

    setIsSubmitting(true);
    startTransition(async () => {
      const res = await createCommentAction(selectedCourse.id, user.id as number, commentText);

      if (res?.success && res.comment) {
        setSelectedCourse((prev) =>
          prev
            ? {
                ...prev,
                comments: [...prev.comments, res.comment],
              }
            : prev
        );
        setCommentText("");
        toast.success("Comment added successfully");
      } else {
        toast.error(res?.message || "Something went wrong");
      }

      setIsSubmitting(false);
    });
  };

  const handleDelete = (commentId: number) => {
    if (!selectedCourse) return;
    startTransition(async () => {
      const res = await deleteCommentAction(commentId, user?.id as number);
      if (res?.success) {
        setSelectedCourse((prev) =>
          prev
            ? {
                ...prev,
                comments: prev.comments.filter((comment) => comment.id !== commentId),
              }
            : prev
        );
        toast.success("Comment deleted");
      } else {
        toast.error("Failed to delete comment");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Course List */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-foreground">Courses</h2>
        <div className="space-y-4">
          {courses.map((course) => (
            <Card
              key={course.id}
              className={`cursor-pointer hover:shadow-md transition-shadow ${selectedCourse?.id === course.id ? "ring ring-primary" : ""}`}
              onClick={() => setSelectedCourse(course)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <Badge variant="secondary" className="text-xs mb-2">
                      {course.category.title}
                    </Badge>
                    <h3 className="font-medium text-foreground mb-2">{course.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageCircle className="w-4 h-4" />
                      <span>{course.comments.length} Comments</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Discussion Panel */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-foreground">Discussion</h2>
        <Card className="h-[600px] flex flex-col">
          <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
            {selectedCourse ? (
              selectedCourse.comments.length > 0 ? (
                selectedCourse.comments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    <div className="flex gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={comment.user.avatarUrl || ""} />
                        <AvatarFallback>
                          {comment.user.fullname
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{comment.user.fullname}</span>
                            <span className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div>
                            {(comment.user.id === user?.id || user?.role === "ADMIN") && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleDelete(comment.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No comments yet.</p>
              )
            ) : (
              <p className="text-muted-foreground text-sm">Select a course to see comments.</p>
            )}
          </CardContent>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input placeholder="Enter your comment" className="flex-1" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
              <Button variant="ghost" size="icon">
                <Smile className="w-4 h-4" />
              </Button>
              <Button size="icon" onClick={handleSubmit} disabled={isSubmitting || isPending || !commentText.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DiscussionClient;
