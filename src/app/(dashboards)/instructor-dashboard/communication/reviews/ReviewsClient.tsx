"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Trash2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Prisma } from "@/generated/prisma";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { Star } from "lucide-react";
import { createReviewAction, deleteReviewAction } from "@/actions/reviewsActions";
import { Input } from "@/components/ui/input";
import StarsRating from "@/components/shared/StarsRating";

type CourseWithCategory = Prisma.CourseGetPayload<{
  include: { category: true; instructor: true; reviews: { include: { user: true } } };
}>;

type User = Prisma.UserGetPayload<{
  include: { reviews: { include: { course: true } } };
}>;

const ReviewsClient = ({ courses }: { courses: CourseWithCategory[] }) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseWithCategory | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
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
    if (!selectedCourse || !reviewText.trim() || !user || !rating) return;

    setIsSubmitting(true);
    startTransition(async () => {
      const res = await createReviewAction(selectedCourse.id, user.id as number, reviewText, rating);

      if (res?.success && res.review) {
        setSelectedCourse((prev) =>
          prev
            ? {
                ...prev,
                reviews: [...prev.reviews, res.review],
              }
            : prev
        );
        setReviewText("");
        setRating(0);
        toast.success("Review added successfully");
      } else {
        toast.error(res?.message || "Something went wrong");
      }

      setIsSubmitting(false);
    });
  };

  const handleDelete = (reviewId: number) => {
    if (!selectedCourse) return;
    startTransition(async () => {
      const res = await deleteReviewAction(reviewId, user?.id as number);
      if (res?.success) {
        setSelectedCourse((prev) =>
          prev
            ? {
                ...prev,
                reviews: prev.reviews.filter((review) => review.id !== reviewId),
              }
            : prev
        );
        toast.success("Review deleted");
      } else {
        toast.error("Failed to delete review");
      }
    });
  };
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Course List */}
      <div className="max-h-[800px] overflow-auto">
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
                      <span>{course.reviews.length} reviews</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Reviews Panel */}
      <div className="max-h-[800px] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Reviews</h2>
        </div>

        <div className="space-y-4">
          {selectedCourse ? (
            selectedCourse.reviews.length > 0 ? (
              <>
                {selectedCourse.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={review.user.avatarUrl as string} />
                          <AvatarFallback>
                            {review.user.fullname
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-foreground">{review.user.fullname}</span>
                              <span className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
                            </div>

                            <div>
                              {(review.user.id === user?.id || user?.role === "ADMIN") && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-600"
                                  onClick={() => handleDelete(review.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{review.review}</p>
                          <div className="flex gap-1">{renderStars(review.rating)}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {/* Message Input */}

                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input placeholder="Enter your comment" className="flex-1" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                    <StarsRating value={rating} onChange={setRating} size={18} />
                    <Button size="icon" onClick={handleSubmit} disabled={isSubmitting || isPending || !reviewText.trim() || !rating}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">No reviews yet.</p>
            )
          ) : (
            <p className="text-muted-foreground text-sm">Select a course to see reviews.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsClient;
