"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const StudentMonitoring = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Student Monitoring</CardTitle>
        <Select defaultValue="lastWeek">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lastWeek">Last Week</SelectItem>
            <SelectItem value="thisWeek">This Week</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Ring */}
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="transparent" stroke="hsl(var(--muted))" strokeWidth="12" />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="transparent"
                stroke="hsl(var(--chart-1))"
                strokeWidth="12"
                strokeDasharray={`${19 * 3.4} ${100 * 3.4}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">+19%</span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">New Student</p>
            <p className="text-2xl font-bold">75</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Enroll Courses</span>
              <span className="text-sm font-medium text-success">+9%</span>
            </div>
            <Progress value={60} className="h-2" />
            <p className="text-center text-lg font-semibold">25</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentMonitoring;