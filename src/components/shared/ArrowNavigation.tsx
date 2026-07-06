import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from "lucide-react";
import { Button } from "../ui/button";

export const ArrowNavigation = ({ id = "" }: { id?: string }) => {
  return (
    <>
      <div className="flex gap-1 justify-center relative">
        <Button size={"icon"} variant={"ghost"} className={`w-8 h-8 p-1 hover:bg-primary hover:text-white swiper-button-prev-${id}`}>
          <MoveLeft />
        </Button>
        <Button size={"icon"} variant={"ghost"} className={`w-8 h-8 p-1 hover:bg-primary hover:text-white swiper-button-next-${id}`}>
          <MoveRight />
        </Button>
      </div>
    </>
  );
};

export const ChevronNavigation = ({ id = "" }: { id?: string }) => {
  return (
    <div className="flex gap-4 justify-center">
      <Button size={"icon"} variant={"outline"} className={`swiper-button-prev-${id}`}>
        <ChevronLeft />
      </Button>
      <Button size={"icon"} variant={"outline"} className={`swiper-button-next-${id}`}>
        <ChevronRight />
      </Button>
    </div>
  );
};
