import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface AdminStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

export function AdminStatCard({
  title,
  value,
  icon: Icon,
  description,
}: AdminStatCardProps) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="text-3xl font-bold">
            {value}
          </h2>

          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="rounded-xl border p-3">
          <Icon className="h-7 w-7" />
        </div>
      </CardContent>
    </Card>
  );
}