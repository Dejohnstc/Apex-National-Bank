import type { Account } from "@/types/account";

interface AccountInformationProps {
  account: Account;
}

export function AccountInformation({
  account,
}: AccountInformationProps) {
  return (
    <div className="rounded-2xl border p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Account Information
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <InfoRow
          label="Account Number"
          value={account.accountNumber}
        />

        <InfoRow
          label="Routing Number"
          value={account.routingNumber}
        />

        <InfoRow
          label="Status"
          value={account.status}
        />

        <InfoRow
          label="Currency"
          value={account.currency}
        />
      </div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value}
      </p>
    </div>
  );
}