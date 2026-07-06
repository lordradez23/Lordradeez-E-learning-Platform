import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import Image from "next/image";
import { Prisma } from "@/generated/prisma/client";

type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: { user: true; course: true };
}>;

type ReviewCardProps = {
  review: ReviewWithUser;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-800 w-70 min-h-[222px] p-6 gap-4 rounded-md shadow hover:shadow-xl duration-200">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src={(review.user.avatarUrl as string) || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
            alt="user avatar"
          />
          <AvatarFallback>
            <Image
              src={(review.user.avatarUrl as string) || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
              alt="user avatar"
              width={400}
              height={400}
              className="rounded-full"
            />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{review.user.fullname}</h3>
          <p className="text-muted-foreground text-sm line-clamp-1">{review.user.university || ""}</p>
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-5 line-clamp-4" title={review.review}>
        {review.review}
      </p>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: Number(Math.ceil(Number(review.rating))) }).map((_, index) => (
          <Star key={index} fill="#dd7621" size={18} className="text-transparent " />
        ))}
        {Array.from({ length: 5 - Number(Math.ceil(Number(review.rating))) }).map((_, index) => (
          <Star key={index} fill="#bababa" size={18} className="text-transparent " />
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
