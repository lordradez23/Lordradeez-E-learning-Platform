"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { createCommentAction, deleteCommentAction } from "@/actions/commentActions";
import { toast } from "react-toastify";

type Comment = {
  id: number;
  content: string;
  createdAt: Date;
  user: {
    id: number;
    fullname: string;
    avatarUrl: string | null;
  };
};

const CourseComments = ({ comments: initialComments, user, courseId }: { comments: Comment[]; user: JwtPayload; courseId: number }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments || []);
  const [commentText, setCommentText] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!commentText.trim() || !user) return;

    setIsSubmitting(true);
    startTransition(async () => {
      const res = await createCommentAction(courseId, user.id as number, commentText);

      if (res?.success && res.comment) {
        const newComment: Comment = {
          ...res.comment,
          user: {
            id: user.id,
            fullname: user.fullName,
            avatarUrl: user.avatar,
          },
        };
        setComments((prev) => [newComment, ...prev]);

        setCommentText("");
        toast.success("Comment added successfully");
      } else {
        toast.error(res?.message || "Something went wrong");
      }

      setIsSubmitting(false);
    });
  };

  const handleDelete = (commentId: number) => {
    startTransition(async () => {
      const res = await deleteCommentAction(commentId, user?.id as number);
      if (res?.success) {
        setComments((prev) => prev.filter((comment) => comment.id !== commentId));
        toast.success("Comment deleted");
      } else {
        toast.error("Failed to delete comment");
      }
    });
  };

  return (
    <>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="flex space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={(comment.user.avatarUrl as string) || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                alt="Profile Image"
              />
              <AvatarFallback className="bg-muted">
                {comment.user.fullname
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium text-sm">{comment.user.fullname}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{comment.content}</p>
                </div>
                <div>
                  {(comment.user.id === user?.id || user?.role === "ADMIN") && (
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(comment.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{`${comment.createdAt.toLocaleDateString()} - ${comment.createdAt.toLocaleTimeString()}`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-3">
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={(user?.avatar as string) || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"} alt="Profile Image" />
          <AvatarFallback className="bg-primary text-white">{user?.fullName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <Input placeholder="Enter your comment..." className="bg-white" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
          <div className="flex justify-end">
            <Button className="flex items-center space-x-2" onClick={handleSubmit} disabled={isSubmitting || isPending}>
              <Send className="h-4 w-4" />
              <span>Send</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseComments;
