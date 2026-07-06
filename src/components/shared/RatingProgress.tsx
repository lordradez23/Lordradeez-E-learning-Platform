"use client";
import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
const RatingProgress = ({ count, className = "" }: { count: number; className?: string }) => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(count), 500);
    return () => clearTimeout(timer);
  }, [count]);
  return <Progress value={progress} className={cn(`h-5 bg-gray-200 dark:bg-slate-600 ${className}`)} />;
};
export default RatingProgress;
