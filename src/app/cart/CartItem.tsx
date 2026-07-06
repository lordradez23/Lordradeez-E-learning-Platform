"use client";
import { Dot, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { removeFromCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "react-toastify";

const CartItem = (course: ICartItem) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(course.id));
    toast.success("Course removed Successfully");
  };
  return (
    <li
      className="bg-white dark:bg-slate-800 flex max-w-full gap-4 border-b-2 border-primary p-4 shadow-md hover:shadow-lg duration-200 rounded-lg"
      key={course.id}
    >
      <Image src={course.imageUrl as string} alt={course.title} width={200} height={200} className="size-16 rounded-sm object-cover" />
      <div>
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <div className="mt-0.5 space-y-px text-muted-foreground">
          <div>
            <div className="flex items-center  flex-wrap  gap-0.5">
              <span className="text-xs text-[#dd7621] font-medium">{course.ratingCount}</span>
              {Array.from({ length: Number(Math.ceil(Number(course.ratingCount))) }).map((_, index) => (
                <Star key={index} fill="#dd7621" size={15} className="text-transparent " />
              ))}
              {Array.from({ length: 5 - Number(Math.ceil(Number(course.ratingCount))) }).map((_, index) => (
                <Star key={index} fill="#bababa" size={15} className="text-transparent " />
              ))}
              <p className=" text-xs">
                <span className="text-muted-foreground"> ({course.ratingTotal} rating)</span>
              </p>
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-1 mt-2 sm:mt-0">
            <h4 className="text-xs">{course.duration}</h4>
            <Dot />
            <h4 className="text-xs">{course.lectures} Lectures</h4>
          </div>
          <div className="flex items-center flex-wrap gap-4">
            <button className="text-primary transition hover:bg-primary/10 p-1 rounded-md">
              <Link href={`/all-courses/${course.slug}`}>View Details</Link>
            </button>
            <button className="text-red-600 transition hover:bg-red-600/10 p-1 rounded-md" onClick={handleRemove}>
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 justify-end gap-2">
        <strong className="text-lg font-bold text-primary">${course.price}</strong>
      </div>
    </li>
  );
};

export default CartItem;
