import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { DashboardStats } from "@/types/admin/dashboard.types";

interface Props {
  data: DashboardStats;
}

export function AdminRecentActivity({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent>
        {data.recentActivity.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent activity.
          </p>
        ) : (
          <div className="space-y-4">
            {data.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between border-b pb-3 last:border-0"
              >
                <div>
                  <p className="font-medium">
                    {activity.title}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>

                  <p className="mt-1 text-xs uppercase text-muted-foreground">
                    {activity.type}
                  </p>
                </div>

                <span className="text-xs text-muted-foreground">
                  {new Date(activity.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}