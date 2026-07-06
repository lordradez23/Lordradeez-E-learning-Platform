"use client";
import ReviewCard from "./cards/ReviewCard";
import SwiperSlider from "@/swiper/SwiperSlider";
import { SwiperSlide } from "swiper/react";
import { Prisma } from "@/generated/prisma/client";

type ReviewsWithUser = Prisma.ReviewGetPayload<{
  include: { user: true; course: true };
}>;

interface IProps {
  heading: React.ReactNode;
  navigation?: React.ReactNode;
  reviews: ReviewsWithUser[];
  swiper?: boolean;
  id?: string;
}

const Reviews = ({ reviews, heading, navigation = "", swiper = false, id = "" }: IProps) => {
  return (
    <>
      {heading}
      <div className="space-y-4">
        <div className="flex justify-evenly flex-wrap gap-6">
          {reviews && reviews.length > 0 ? (
            swiper || reviews.length > 5 ? (
              <SwiperSlider id={id}>
                {reviews.map((review) => (
                  <SwiperSlide key={review.id}>
                    <ReviewCard review={review} />
                  </SwiperSlide>
                ))}
              </SwiperSlider>
            ) : (
              reviews.map((review) => <ReviewCard key={review.id} review={review} />)
            )
          ) : (
            <p className="text-center text-muted-foreground">No reviews yet</p>
          )}
        </div>
        {reviews && reviews.length > 0 && navigation}
      </div>
    </>
  );
};

export default Reviews;
