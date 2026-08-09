import Link from "next/link";

import { Button } from "@/components/ui/button";

import ExternalAccountsTable from "@/components/externalAccounts/ExternalAccountTable";

import { getExternalAccounts } from "@/services/externalAccounts/getExternalAccounts";

export default async function ExternalAccountsPage() {
  const accounts =
    await getExternalAccounts();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            External Accounts
          </h1>

          <p className="text-muted-foreground">
            Manage your linked bank accounts.
          </p>
        </div>

        <Link href="/dashboard/ach/external-accounts/new">
          <Button>
            Add Account
          </Button>
        </Link>
      </div>

      <ExternalAccountsTable
        accounts={accounts}
      />
    </div>
  );
}