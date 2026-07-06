import { cn } from "@/lib/utils";

const CoursesCategoriesSkeleton = ({ heading }: { heading?: React.ReactNode }) => {
  return (
    <div className="my-6 space-y-6">
      {heading && <div className="space-y-2">{heading}</div>}
      <div className="flex justify-evenly flex-wrap gap-6">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className={cn("flex flex-col items-center gap-8 bg-slate-100 dark:bg-slate-700 w-54 py-6 rounded-md shadow animate-pulse")}>
            <span className="bg-slate-300 dark:bg-slate-600 rounded-full p-6" />
            <div className="h-4 w-20 bg-slate-300 dark:bg-slate-600 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesCategoriesSkeleton;
