"use client";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { earningInstChartData } from "@/constants";

const EarningChart =()=> {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Earning Stats</CardTitle>
        <Select defaultValue="monthly">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={earningInstChartData}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopOpacity={0.3} />
                  <stop offset="95%" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#57acdf",
                  border: "1px solid #bad9f1",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-medium)",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#1f50b1"
                strokeWidth={3}
                fill="#1f60e2"
                dot={{ fill: "#ff2056", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#00bc7d" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default EarningChart