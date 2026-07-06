import { Skeleton } from "@/components/ui/skeleton";

const ReviewsSkeleton = ({ heading }: { heading?: React.ReactNode }) => {
  return (
    <div className="my-6 space-y-6">
      {heading && <div className="space-y-2">{heading}</div>}
      <div className="space-y-4">
        <div className="flex justify-evenly flex-wrap gap-6">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex flex-col bg-white dark:bg-slate-800 w-70 min-h-[222px] p-6 gap-4 rounded-md shadow">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-2/3" />
              </div>
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-4 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSkeleton;
