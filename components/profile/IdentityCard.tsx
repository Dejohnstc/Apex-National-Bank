import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface IdentityCardProps {
  profile: {
    customerId: string;

    accountNumber: string;

    routingNumber: string;

    accountType: string;

    accountStatus: string;

    currency: string;

    availableBalance: number;

    currentBalance: number;

    kycStatus?: string | null;

    createdAt: string | null;

    openedAt?: string | null;
  };
}

export default function IdentityCard({
  profile,
}: IdentityCardProps) {
  const status =
    profile.kycStatus ?? "Pending";

  const badgeVariant =
  status === "VERIFIED"
    ? "default"
    : status === "REJECTED"
      ? "destructive"
      : "secondary";

  return (
  <Card className="border-slate-200 shadow-sm">

    <CardHeader className="border-b bg-slate-50/70">

      <CardTitle className="text-xl font-bold text-slate-900">
        Banking Identity
      </CardTitle>

      <CardDescription>
        Your primary banking profile and account information.
      </CardDescription>

    </CardHeader>

    <CardContent className="space-y-5 pt-6">

      <Row
        label="Customer ID"
        value={profile.customerId}
      />

      <Row
        label="Account Number"
        value={profile.accountNumber}
      />

      <Row
        label="Routing Number"
        value={profile.routingNumber}
      />

      <Row
        label="Account Type"
        value={profile.accountType}
      />

      <Row
        label="Account Status"
        value={
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            {profile.accountStatus}
          </Badge>
        }
      />

      <Row
        label="Currency"
        value={profile.currency}
      />

      <div className="rounded-2xl border bg-slate-50 p-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-500">
              Available Balance
            </p>

            <p className="mt-1 text-2xl font-bold text-emerald-700">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: profile.currency,
              }).format(profile.availableBalance)}
            </p>

          </div>

          <div className="text-right">

            <p className="text-sm text-slate-500">
              Current Balance
            </p>

            <p className="mt-1 text-xl font-semibold text-slate-900">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: profile.currency,
              }).format(profile.currentBalance)}
            </p>

          </div>

        </div>

      </div>

      <div className="flex items-center justify-between rounded-xl border bg-slate-50 px-4 py-3">

        <span className="text-sm text-slate-500">
          Identity Verification
        </span>

        <Badge variant={badgeVariant}>
          {status}
        </Badge>

      </div>

      <Row
        label="Account Opened"
        value={
          profile.openedAt
            ? new Date(
                profile.openedAt
              ).toLocaleDateString()
            : "-"
        }
      />

      <Row
        label="Member Since"
        value={
          profile.createdAt
            ? new Date(
                profile.createdAt
              ).toLocaleDateString()
            : "-"
        }
      />

    </CardContent>

  </Card>
);
}
interface RowProps {
  label: string;
  value: React.ReactNode;
}
function Row({
  label,
  value,
}: RowProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">

      <span className="text-sm font-medium text-slate-500">
        {label}
      </span>

      <span className="text-right font-semibold text-slate-900">
        {value}
      </span>

    </div>
  );
}