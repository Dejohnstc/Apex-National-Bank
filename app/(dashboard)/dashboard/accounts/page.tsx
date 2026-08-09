import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getAccounts } from "@/services/account/getAccounts";

import { AccountsGrid } from "@/components/accounts/AccountsGrid";

export default async function AccountsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const accounts = await getAccounts(
    session.user.id
  );

  return (
    <div className="space-y-8">
      <AccountsGrid accounts={accounts} />
    </div>
  );
}