import { Skeleton } from "../ui/skeleton";

const NewsSkeleton = ({ heading }: { heading?: React.ReactNode }) => {
  return (
    <div className="my-6 space-y-6">
      {heading && <div className="space-y-2">{heading}</div>}
      <div className="flex justify-evenly flex-wrap gap-6 my-6">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="flex flex-col bg-slate-100 dark:bg-slate-700 pb-4 gap-4 rounded-md shadow">
            <Skeleton className="w-[200px] h-[100px] rounded-md" />
            <div className="space-y-2 px-4">
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <div className="flex items-center justify-between gap-2 mt-4">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-8 w-20 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSkeleton;
