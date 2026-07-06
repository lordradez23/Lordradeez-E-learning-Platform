import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Prisma } from "@/generated/prisma/client";

type NewsWithCategory = Prisma.NewsGetPayload<{
  include: { category: true };
}>;

type NewsCardProps = {
  News: NewsWithCategory;
};

const NewsCard = ({ News }: NewsCardProps) => {
  return (
    <div className="flex flex-col bg-slate-100 dark:bg-slate-700 pb-4 gap-4 rounded-md shadow hover:shadow-xl duration-200">
      <Image src={News.imageUrl} alt="news image" width={400} height={400} className="rounded-md" />
      <div className="space-y-2 px-4">
        <Badge className={` text-white bg-emerald-500`}>{News.category.title}</Badge>
        <h3 className="text-lg font-medium line-clamp-1">{News.title}</h3>
        <p className="text-muted-foreground text-xs line-clamp-2">{News.description}</p>
        <div className="flex items-center justify-between gap-2 mt-4">
          <div>
            <span className="text-[11px] font-medium">{News.reads} Reads | </span>
            <span className="text-[11px] font-medium">{News.createdAt.toISOString().split("T")[0]}</span>
          </div>
          <Button className="text-white">Read Now</Button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
