"use client";
import { cn } from "@/lib/utils";
import { Prisma } from "@/generated/prisma/client";
import { IconsMap } from "../shared/Icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type CategoryCardProps = {
  category: Prisma.CategoryGetPayload<{ include: { courses: true } }>;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  const IconComponent = IconsMap[category.iconName as keyof typeof IconsMap];
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname !== "/courses-category") {
      router.push(`/courses-category?category=${category.title}`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", category.title);
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div
      className={cn(
        `flex flex-col items-center gap-8 bg-slate-100 dark:bg-slate-700 w-54 py-6 rounded-md shadow group hover:shadow-lg hover:bg-primary dark:hover:bg-slate-500 duration-200`
      )}
      onClick={handleClick}
    >
      <span
        className={cn(
          `bg-primary text-white group-hover:text-primary group-hover:bg-white rounded-full p-3`
        )}
      >
        {IconComponent ? <IconComponent /> : null}
      </span>
      <h3 className={cn(`font-medium group-hover:text-white`)}>
        {category.title}
      </h3>
    </div>
  );
};

export default CategoryCard;
