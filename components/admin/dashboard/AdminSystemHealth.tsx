import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { DashboardStats } from "@/types/admin/dashboard.types";

interface Props {
  data: DashboardStats;
}

const STATUS_COLORS = {
  healthy: "text-green-600",
  warning: "text-yellow-600",
  down: "text-red-600",
} as const;

export function AdminSystemHealth({ data }: Props) {
  const { health } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span>API</span>

          <span className={`font-medium ${STATUS_COLORS[health.api]}`}>
            {health.api}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Database</span>

          <span className={`font-medium ${STATUS_COLORS[health.database]}`}>
            {health.database}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Email</span>

          <span className={`font-medium ${STATUS_COLORS[health.email]}`}>
            {health.email}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Payments</span>

          <span className={`font-medium ${STATUS_COLORS[health.payments]}`}>
            {health.payments}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}