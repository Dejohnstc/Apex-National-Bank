import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

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

  return (
    <div className="space-y-6">
      <SecurityOverview
        twoFactorEnabled={false}
        activeSessions={sessions.length}
        trustedDevices={devices.length}
        lastPasswordChanged={null}
      />

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
            current: false, // we'll detect the current session later
          }))}
        />
      </div>

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