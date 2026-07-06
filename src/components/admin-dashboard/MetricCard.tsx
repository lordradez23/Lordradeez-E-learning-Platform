"use client";
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease";
  icon?: ReactNode;
  className?: string;
}

const MetricCard = ({ title, value, change, changeType = "increase", icon, className }: MetricCardProps) => {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <div className="flex items-center space-x-1">
                <div className={cn("h-1 w-12 rounded-full", changeType === "increase" ? "bg-success" : "bg-destructive")} />
                <span className="text-xs text-muted-foreground">{change}</span>
              </div>
            )}
          </div>
          {icon && <div className="p-3 bg-secondary rounded-lg">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;