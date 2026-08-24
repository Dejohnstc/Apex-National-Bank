import { auth } from "@/lib/auth";

import { getAccountSettings } from "@/services/settings/getAccountSettings";
import { getNotificationSettings } from "@/services/settings/getNotificationSettings";
import { getSecuritySettings } from "@/services/settings/getSecuritySettings";
import { getCustomerTransferLimits } from "@/services/settings/getCustomerTransferLimit";

import SecuritySettings from "@/components/settings/SecuritySettings";
import AccountSettings from "@/components/settings/AccountSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import TransferLimitSettings from "@/components/settings/TransferLimitSettings";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const [
    accountSettings,
    notificationSettings,
    securitySettings,
    transferLimits,
  ] = await Promise.all([
    getAccountSettings(
      session.user.id
    ),

    getNotificationSettings(
      session.user.id
    ),

    getSecuritySettings(
      session.user.id
    ),

    getCustomerTransferLimits(
      session.user.id
    ),
  ]);

  if (!accountSettings) {
    throw new Error(
      "Account settings not found."
    );
  }

  if (!notificationSettings) {
    throw new Error(
      "Notification settings not found."
    );
  }

  if (!securitySettings) {
    throw new Error(
      "Security settings not found."
    );
  }

  if (!transferLimits) {
    throw new Error(
      "Transfer limits not found."
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 p-6">

      {/* Page Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your account preferences,
          notifications, security,
          appearance, and transfer limits.
        </p>
      </div>

      {/* Account */}

      <AccountSettings
        settings={accountSettings}
      />

      {/* Notifications */}

      <NotificationSettings
        settings={notificationSettings}
      />

      {/* Appearance */}

      <AppearanceSettings />

      {/* Security */}

      <SecuritySettings
        settings={securitySettings}
      />

      {/* Transfer Limits */}

      <TransferLimitSettings
        limits={transferLimits}
      />

    </main>
  );
}