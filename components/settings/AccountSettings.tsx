"use client";

import {
  Building2,
  CalendarDays,
  CreditCard,
  Hash,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

interface AccountSettingsData {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  kycStatus: string;
  accountNumber: string;
  routingNumber: string;
  accountType: string;
  accountStatus: string;
  currency: string;
  openedAt: string | null;
}

interface Props {
  settings: AccountSettingsData;
}

export default function AccountSettings({
  settings,
}: Props) {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
            <User className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Account
            </h2>

            <p className="text-sm text-slate-500">
              View your customer and banking account
              information.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Info
            icon={Hash}
            label="Customer ID"
            value={
              settings.customerId ||
              "Not available"
            }
          />

          <Info
            icon={User}
            label="Account Holder"
            value={`${settings.firstName} ${settings.lastName}`}
          />

          <Info
            icon={Mail}
            label="Email"
            value={settings.email}
          />

          <Info
            icon={Phone}
            label="Phone"
            value={settings.phone}
          />

          <Info
            icon={ShieldCheck}
            label="KYC Status"
            value={
              settings.kycStatus ||
              "Not available"
            }
          />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
            <Building2 className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Bank Account
            </h2>

            <p className="text-sm text-slate-500">
              Your primary checking account
              information.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Info
            icon={CreditCard}
            label="Account Number"
            value={
              settings.accountNumber
                ? `••••${settings.accountNumber.slice(-4)}`
                : "Not available"
            }
          />

          <Info
            icon={Hash}
            label="Routing Number"
            value={
              settings.routingNumber ||
              "Not available"
            }
          />

          <Info
            icon={Building2}
            label="Account Type"
            value={
              settings.accountType ||
              "Not available"
            }
          />

          <Info
            icon={ShieldCheck}
            label="Account Status"
            value={
              settings.accountStatus ||
              "Not available"
            }
          />

          <Info
            icon={Hash}
            label="Currency"
            value={settings.currency}
          />

          <Info
            icon={CalendarDays}
            label="Opened"
            value={
              settings.openedAt
                ? new Date(
                    settings.openedAt
                  ).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )
                : "Not available"
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