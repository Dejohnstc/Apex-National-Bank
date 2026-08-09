import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import DeleteExternalAccountButton from "./DeleteExternalAccountButton";
import SetDefaultButton from "./SetDefaultButton";

interface ExternalAccount {
  _id: string;
  nickname: string;
  accountHolderName: string;
  bankName: string;
  routingNumber: string;
  accountType: string;
  isDefault: boolean;
  verified: boolean;
}

interface Props {
  accounts: ExternalAccount[];
}

export default function ExternalAccountsTable({
  accounts,
}: Props) {
  if (accounts.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <h3 className="text-lg font-semibold">
          No External Accounts
        </h3>

        <p className="mt-2 text-muted-foreground">
          Link your first external bank account to
          simplify ACH transfers.
        </p>

        <Link href="/dashboard/ach/external-accounts/new">
          <Button className="mt-6">
            Add External Account
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="p-4 text-left">Nickname</th>
            <th className="p-4 text-left">Bank</th>
            <th className="p-4 text-left">Holder</th>
            <th className="p-4 text-left">Type</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((account) => (
            <tr
              key={account._id}
              className="border-b last:border-0"
            >
              <td className="p-4">
                <div className="font-medium">
                  {account.nickname}
                </div>

                {account.isDefault && (
                  <Badge className="mt-2">
                    Default
                  </Badge>
                )}
              </td>

              <td className="p-4">
                {account.bankName}
              </td>

              <td className="p-4">
                {account.accountHolderName}
              </td>

              <td className="p-4">
                {account.accountType}
              </td>

              <td className="p-4">
                {account.verified ? (
                  <Badge>
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    Pending
                  </Badge>
                )}
              </td>

              <td className="p-4">
                <div className="flex justify-end gap-2">
                  {!account.isDefault && (
                    <SetDefaultButton
                      id={account._id}
                    />
                  )}

                  <DeleteExternalAccountButton
                    id={account._id}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}