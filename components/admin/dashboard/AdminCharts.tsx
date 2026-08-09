import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { DashboardStats } from "@/types/admin/dashboard.types";

interface Props {
  data: DashboardStats;
}

export function AdminCharts({ data }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Transaction Volume</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Today</span>
            <span className="font-semibold">
              {data.volume.today.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span>This Month</span>
            <span className="font-semibold">
              {data.volume.month.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span>This Year</span>
            <span className="font-semibold">
              {data.volume.year.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Today</span>
            <span className="font-semibold">
              ${data.revenue.today.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span>This Month</span>
            <span className="font-semibold">
              ${data.revenue.month.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span>This Year</span>
            <span className="font-semibold">
              ${data.revenue.year.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}