import { getAllReviewsAction } from "@/actions/reviewsActions";
import React from "react";
import Reviews from "../Reviews";
import Heading from "../shared/Heading";
import { ArrowNavigation } from "../shared/ArrowNavigation";

const ReviewsSection = async () => {
  const reviews = await getAllReviewsAction();

  return (
    <Reviews
      reviews={reviews.slice(0, 8)}
      heading={<Heading title="What our students say" description="Find out what experiences and what they have to say about the course with us" />}
      navigation={<ArrowNavigation id="reviews" />}
      swiper
      id="reviews"
    />
  );
};

export default ReviewsSection;
