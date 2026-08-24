"use client";

import { useState, useTransition } from "react";
import {
  Bell,
  Mail,
  MessageSquare,
  Megaphone,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { updateNotificationSettingsAction } from "@/actions/settings/updateNotificationSettings";

interface NotificationSettingsData {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

interface Props {
  settings: NotificationSettingsData;
}

export default function NotificationSettings({
  settings,
}: Props) {
  const [emailNotifications, setEmailNotifications] =
    useState(settings.emailNotifications);

  const [smsNotifications, setSmsNotifications] =
    useState(settings.smsNotifications);

  const [marketingEmails, setMarketingEmails] =
    useState(settings.marketingEmails);

  const [pending, startTransition] =
    useTransition();

  function updateSetting(
    key:
      | "emailNotifications"
      | "smsNotifications"
      | "marketingEmails",
    value: boolean
  ) {
    if (key === "emailNotifications") {
      setEmailNotifications(value);
    }

    if (key === "smsNotifications") {
      setSmsNotifications(value);
    }

    if (key === "marketingEmails") {
      setMarketingEmails(value);
    }

    startTransition(async () => {
      const result =
        await updateNotificationSettingsAction({
          [key]: value,
        });

      if (!result.success) {
        // Restore the previous value if the
        // server update failed.
        if (key === "emailNotifications") {
          setEmailNotifications(
            !value
          );
        }

        if (key === "smsNotifications") {
          setSmsNotifications(
            !value
          );
        }

        if (key === "marketingEmails") {
          setMarketingEmails(
            !value
          );
        }

        toast.error(
          result.message ??
            "Unable to update setting."
        );

        return;
      }

      toast.success(
        "Notification setting updated."
      );
    });
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
            <Bell className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Notifications
            </h2>

            <p className="text-sm text-slate-500">
              Choose how Apex National Bank
              communicates with you.
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-200">
        <SettingRow
          icon={Mail}
          title="Email notifications"
          description="Receive important account and transaction notifications by email."
          enabled={emailNotifications}
          disabled={pending}
          onChange={(value) =>
            updateSetting(
              "emailNotifications",
              value
            )
          }
        />

        <SettingRow
          icon={MessageSquare}
          title="SMS notifications"
          description="Receive eligible account alerts and security notifications by text message."
          enabled={smsNotifications}
          disabled={pending}
          onChange={(value) =>
            updateSetting(
              "smsNotifications",
              value
            )
          }
        />

        <SettingRow
          icon={Megaphone}
          title="Marketing emails"
          description="Receive product updates, offers, and other promotional communications."
          enabled={marketingEmails}
          disabled={pending}
          onChange={(value) =>
            updateSetting(
              "marketingEmails",
              value
            )
          }
        />
      </div>

      {pending && (
        <div className="flex items-center gap-2 border-t border-slate-200 px-6 py-4 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving your preference...
        </div>
      )}
    </section>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  enabled,
  disabled,
  onChange,
}: {
  icon: React.ComponentType<{
    className?: string;
  }>;
  title: string;
  description: string;
  enabled: boolean;
  disabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 p-6">
      <div className="flex min-w-0 items-start gap-4">
        <div className="mt-1 rounded-xl bg-slate-100 p-3 text-slate-600">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        disabled={disabled}
        onClick={() =>
          onChange(!enabled)
        }
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          enabled
            ? "bg-emerald-600"
            : "bg-slate-300"
        } ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </div>
  );
}