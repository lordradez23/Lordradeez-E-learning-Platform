"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Prisma } from "@/generated/prisma/client";

type CourseWithCategory = Prisma.CourseGetPayload<{
  include: { category: true };
}>;

type CourseCardProps = {
  course: CourseWithCategory;
};

const AddToCartButton = ({ course }: CourseCardProps) => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    const exists = cart.find((item) => item.id === course.id);
    if (exists) {
      toast.error("Course is already exists");
      return;
    }
    const courseToAdd: ICartItem = {
      id: course.id,
      title: course.title,
      description: course.description,
      slug: course.slug,
      imageUrl: course.imageUrl,
      price: course.price,
      duration: course.duration,
      lectures: course.lectures,
      ratingCount: course.ratingCount,
      ratingTotal: course.ratingTotal,
    };

    dispatch(addToCart(courseToAdd));
    toast.success("Course added Successfully");
  };
  return (
    <Button onClick={handleAddToCart} className="dark:text-white">
      Add Course
    </Button>
  );
};

export default AddToCartButton;
