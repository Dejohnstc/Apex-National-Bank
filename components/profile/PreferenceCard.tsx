"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { updatePreferencesAction } from "@/actions/profile/updatePreferences";

interface PreferencesCardProps {
  profile: {
    id: string;

    firstName: string;
    lastName: string;

    email: string;
    phone: string;

    customerId?: string;
    accountNumber?: string;
    accountType?: string;

    occupation?: string | null;
    maritalStatus?: string | null;

    address?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    country?: string | null;

    avatar?: string | null;

    kycStatus?: string | null;

    dateOfBirth?: string | null;
    createdAt?: string | null;

    emailNotifications?: boolean | null;
    smsNotifications?: boolean | null;
    marketingEmails?: boolean | null;
  };
}

export default function PreferencesCard({
  profile,
}: PreferencesCardProps) {
  const [isPending, startTransition] =
    useTransition();

  const [preferences, setPreferences] =
    useState({
      emailNotifications:
        profile.emailNotifications ?? true,
      smsNotifications:
        profile.smsNotifications ?? false,
      marketingEmails:
        profile.marketingEmails ?? false,
    });

  function handleSave() {
    startTransition(async () => {
      const result =
        await updatePreferencesAction(
          preferences
        );

      if (!result.success) {
        toast.error(
          result.message ??
            "Unable to save preferences."
        );
        return;
      }

      toast.success(
        result.message ??
          "Preferences updated successfully."
      );
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Preferences
        </CardTitle>

        <CardDescription>
          Manage how we communicate with
          you.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label>Email Notifications</Label>

            <p className="text-sm text-muted-foreground">
              Receive account activity by
              email.
            </p>
          </div>

          <Switch
            checked={
              preferences.emailNotifications
            }
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({
                ...prev,
                emailNotifications: checked,
              }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>SMS Notifications</Label>

            <p className="text-sm text-muted-foreground">
              Receive important alerts by
              SMS.
            </p>
          </div>

          <Switch
            checked={
              preferences.smsNotifications
            }
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({
                ...prev,
                smsNotifications: checked,
              }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Marketing Emails</Label>

            <p className="text-sm text-muted-foreground">
              Receive promotions and
              product updates.
            </p>
          </div>

          <Switch
            checked={
              preferences.marketingEmails
            }
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({
                ...prev,
                marketingEmails: checked,
              }))
            }
          />
        </div>

        <Button
          type="button"
          onClick={handleSave}
          disabled={isPending}
        >
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
}