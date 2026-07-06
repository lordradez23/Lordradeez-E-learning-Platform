"use client";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { createReviewAction } from "@/actions/reviewsActions";
import StarsRating from "@/components/shared/StarsRating";

const CourseReviews = ({ user, courseId }: { user: JwtPayload; courseId: number }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!reviewText.trim() || !rating) return;
    if (!user) {
      toast.error("Please login to add a review");
      return;
    }

    setIsSubmitting(true);
    startTransition(async () => {
      const res = await createReviewAction(courseId, user.id as number, reviewText, rating);

      if (res?.success && res.review) {
        setReviewText("");
        setRating(0);
        toast.success("Review added successfully");
      } else {
        toast.error(res?.message || "Something went wrong");
      }
      setIsSubmitting(false);
    });
  };

  return (
    <>
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input placeholder="Enter your review" className="flex-1" value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
          <StarsRating value={rating} onChange={setRating} size={18} />
          <Button size="icon" onClick={handleSubmit} disabled={isSubmitting || isPending || !reviewText.trim() || !rating}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CourseReviews;
