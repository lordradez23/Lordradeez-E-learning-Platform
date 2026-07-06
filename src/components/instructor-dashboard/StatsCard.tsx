"use client";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change: string;
  trend: "up" | "down";
  className?: string;
}

const StatsCard = ({ title, value, icon, change, trend, className }: StatsCardProps)=> {
  return (
    <div className={cn("bg-card rounded-xl p-6 shadow-soft border border-border", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-muted rounded-lg">{icon && <div className="p-3 bg-secondary rounded-lg">{icon}</div>}</div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-foreground">{value}</h3>
          <span className={cn("text-sm font-medium", trend === "up" ? "text-success" : "text-destructive")}>{change}</span>
        </div>
      </div>
    </div>
  );
}

export default StatsCard