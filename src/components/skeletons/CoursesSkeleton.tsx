
const CoursesSkeleton = ({ heading }: { heading?: React.ReactNode }) => {
    return (
        <div className="my-6 space-y-6">
            {heading && (
                <div className="space-y-2">
                    {heading}
                </div>
            )}
            <div className="flex justify-evenly flex-wrap gap-6 my-6">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="flex flex-col w-64 gap-4 pb-6 rounded-md shadow bg-card text-card-foreground animate-pulse">
                        <div className="w-full h-40 bg-slate-300 dark:bg-slate-700 rounded-md" />
                        <div className="px-4 space-y-3">
                            <div className="h-5 w-20 bg-slate-300 dark:bg-slate-700 rounded-full" />
                            <div className="h-4 w-40 bg-slate-300 dark:bg-slate-700 rounded" />
                            <div className="h-3 w-24 bg-slate-300 dark:bg-slate-700 rounded" />
                            <div className="flex gap-2 items-center">
                                <div className="h-4 w-24 bg-slate-300 dark:bg-slate-700 rounded" />
                                <div className="h-3 w-10 bg-slate-300 dark:bg-slate-700 rounded" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="h-8 w-20 bg-slate-300 dark:bg-slate-700 rounded" />
                                <div className="h-5 w-10 bg-slate-300 dark:bg-slate-700 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursesSkeleton;
