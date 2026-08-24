"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  KeyRound,
  LockKeyhole,
  Monitor,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

interface SecuritySettingsData {
  twoFactorEnabled: boolean;

  lastLogin: string | null;
  lastLoginIp: string | null;
  lastLoginDevice: string | null;
  lastLoginLocation: string | null;
  lastLoginBrowser: string | null;

  lastPasswordChanged: string | null;
  passwordExpiresAt: string | null;
}

interface Props {
  settings: SecuritySettingsData;
}

export default function SecuritySettings({
  settings,
}: Props) {
  return (
    <section className="space-y-6">
      {/* Security overview */}

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-100 p-3 text-red-700">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Security
              </h2>

              <p className="text-sm text-slate-500">
                Protect your account and review
                recent security information.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div
            className={`rounded-2xl border p-5 ${
              settings.twoFactorEnabled
                ? "border-emerald-200 bg-emerald-50"
                : "border-amber-200 bg-amber-50"
            }`}
          >
            <div className="flex items-start gap-4">
              {settings.twoFactorEnabled ? (
                <CheckCircle2 className="mt-0.5 h-6 w-6 text-emerald-600" />
              ) : (
                <AlertTriangle className="mt-0.5 h-6 w-6 text-amber-600" />
              )}

              <div>
                <h3 className="font-semibold text-slate-900">
                  Two-factor authentication
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {settings.twoFactorEnabled
                    ? "Two-factor authentication is enabled on your account."
                    : "Two-factor authentication is currently disabled. Enable it to add an additional layer of protection."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password */}

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
              <LockKeyhole className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Password
              </h2>

              <p className="text-sm text-slate-500">
                Manage your account password.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-4">
              <KeyRound className="h-5 w-5 text-slate-600" />

              <div>
                <h3 className="font-semibold text-slate-900">
                  Password
                </h3>

                <p className="text-sm text-slate-500">
                  {settings.lastPasswordChanged
                    ? `Last changed ${formatDate(
                        settings.lastPasswordChanged
                      )}`
                    : "Password change date unavailable."}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Change password
            </button>
          </div>
        </div>
      </div>

      {/* Recent login */}

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <Monitor className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent security activity
              </h2>

              <p className="text-sm text-slate-500">
                Information about your most recent
                login.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-2">
          <Info
            icon={Clock}
            label="Last login"
            value={
              settings.lastLogin
                ? formatDateTime(
                    settings.lastLogin
                  )
                : "Not available"
            }
          />

          <Info
            icon={Smartphone}
            label="Device"
            value={
              settings.lastLoginDevice ??
              "Not available"
            }
          />

          <Info
            icon={Monitor}
            label="Browser"
            value={
              settings.lastLoginBrowser ??
              "Not available"
            }
          />

          <Info
            icon={ShieldCheck}
            label="Location"
            value={
              settings.lastLoginLocation ??
              "Not available"
            }
          />

          <Info
            icon={Monitor}
            label="IP address"
            value={
              settings.lastLoginIp ??
              "Not available"
            }
          />
        </div>
      </div>
    </section>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{
    className?: string;
  }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>

      <p className="mt-2 break-all text-sm font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function formatDate(
  value: string
) {
  return new Date(value).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
}

function formatDateTime(
  value: string
) {
  return new Date(value).toLocaleString(
    "en-US",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
}