import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

import dbConnect from "@/lib/db/connect";
import { User } from "@/models/user/User";

import { getLoginHistory } from "@/services/security/getLoginHistory";
import { getTrustedDevices } from "@/services/security/getTrustedDevices";
import { getSecurityAlerts } from "@/services/security/getSecurityAlerts";
import { getActiveSessions } from "@/services/security/getActiveSessions";

import SecurityOverview from "@/components/security/SecurityOverview";
import PasswordCard from "@/components/security/PasswordCard";
import LoginHistoryCard from "@/components/security/LoginHistoryCard";
import TrustedDevicesCard from "@/components/security/TrustedDeviceCard";
import SecurityAlertsCard from "@/components/security/SecurityAlertsCard";
import ActiveSessionsCard from "@/components/security/ActiveSessionsCard";

export default async function SecurityPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await dbConnect();

  /*
   * Get the real security information
   * stored on the authenticated user's account.
   */
  const user = await User.findById(session.user.id)
    .select(
      "twoFactorEnabled lastPasswordChanged"
    )
    .lean();

  if (!user) {
    redirect("/login");
  }

  const [
    history,
    devices,
    alerts,
    sessions,
  ] = await Promise.all([
    getLoginHistory(session.user.id),
    getTrustedDevices(session.user.id),
    getSecurityAlerts(session.user.id),
    getActiveSessions(session.user.id),
  ]);

  /*
   * Format the password date for display.
   *
   * Using an explicit US locale keeps the
   * server-rendered value deterministic.
   */
  const lastPasswordChanged =
    user.lastPasswordChanged
      ? new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(user.lastPasswordChanged)
      : null;

  return (
    <div className="space-y-6">

      {/* Security Overview */}

      <SecurityOverview
        twoFactorEnabled={
          Boolean(user.twoFactorEnabled)
        }
        activeSessions={sessions.length}
        trustedDevices={devices.length}
        lastPasswordChanged={
          lastPasswordChanged
        }
      />

      {/* Password + Sessions */}

      <div className="grid gap-6 lg:grid-cols-2">

        <PasswordCard />

        <ActiveSessionsCard
          sessions={sessions.map((session) => ({
            id: session._id.toString(),
            device: session.device,
            browser: session.browser,
            os: session.os,
            ip: session.ip,
            location: session.location,
            lastActive: session.lastActive,

            /*
             * Current-session detection will be
             * added once we wire the session/device
             * identifier to the authentication session.
             */
            current: false,
          }))}
        />

      </div>

      {/* Trusted Devices */}

      <TrustedDevicesCard
        devices={devices.map((device) => ({
          id: device._id.toString(),
          device: device.device,
          browser: device.browser,
          ip: device.ip,
          lastUsed: device.lastUsed,
          current: false,
        }))}
      />

      {/* Login History */}

      <LoginHistoryCard
        history={history.map((login) => ({
          id: login._id.toString(),
          browser: login.browser,
          device: login.device,
          os: login.os,
          location: login.location,
          ip: login.ip,
          success: login.success,
          createdAt: login.createdAt,
        }))}
      />

      {/* Security Alerts */}

      <SecurityAlertsCard
        alerts={alerts.map((alert) => ({
          id: alert._id.toString(),
          type: alert.type,
          title: alert.title,
          description: alert.description,
          read: alert.read,
          createdAt: alert.createdAt,
        }))}
      />

    </div>
  );
}