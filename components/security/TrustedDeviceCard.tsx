"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import {
  Laptop,
  Smartphone,
  Monitor,
  Trash2,
  ShieldCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { revokeTrustedDeviceAction } from "@/actions/security/revokeTrustedDevice";

interface TrustedDevice {
  id: string;
  device: string | null;
  browser: string | null;
  ip: string | null;
  lastUsed: string | Date;
  current?: boolean;
}

interface TrustedDevicesCardProps {
  devices: TrustedDevice[];
}

function getIcon(device: string | null) {
  const value = device?.toLowerCase() ?? "";

  if (
    value.includes("iphone") ||
    value.includes("android") ||
    value.includes("mobile")
  ) {
    return Smartphone;
  }

  if (
    value.includes("windows") ||
    value.includes("mac") ||
    value.includes("linux")
  ) {
    return Laptop;
  }

  return Monitor;
}

export default function TrustedDevicesCard({
  devices,
}: TrustedDevicesCardProps) {
  const [isPending, startTransition] =
    useTransition();

  function removeDevice(id: string) {
    const confirmed = window.confirm(
      "Remove this trusted device?"
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      const result =
        await revokeTrustedDeviceAction(id);

      if (!result.success) {
        toast.error(
          result.message ??
            "Unable to remove device."
        );

        return;
      }

      toast.success(
        "Trusted device removed."
      );
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Trusted Devices
        </CardTitle>

        <CardDescription>
          Devices that have recently
          accessed your account.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {devices.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No trusted devices found.
          </p>
        )}

        {devices.map((device) => {
          const Icon = getIcon(
            device.device
          );

          return (
            <div
              key={device.id}
              className="flex items-start justify-between rounded-xl border p-4"
            >
              <div className="flex gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {device.device ??
                        "Unknown Device"}
                    </p>

                    {device.current && (
                      <Badge variant="secondary">
                        Current
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {device.browser ??
                      "Unknown Browser"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {device.ip ??
                      "Unknown IP"}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Last active{" "}
                    {new Date(
                      device.lastUsed
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              {device.current ? (
                <Badge className="gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Current
                </Badge>
              ) : (
                <Button
                  variant="destructive"
                  size="icon"
                  disabled={isPending}
                  onClick={() =>
                    removeDevice(device.id)
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}