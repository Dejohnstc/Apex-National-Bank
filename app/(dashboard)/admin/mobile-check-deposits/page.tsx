import { getAdminDeposits } from "@/services/admin/mobile-check-deposit/getAdminDeposits";

import AdminMobileCheckDeposits from "@/components/admin/mobile-check-deposit/AdminMobileCheckDeposits";

export default async function AdminMobileCheckDepositsPage() {
  const deposits = await getAdminDeposits();

  const serializedDeposits = deposits.map(
    (deposit) => ({
      ...deposit,

      _id: deposit._id.toString(),

      user: deposit.user
        ? {
            _id: deposit.user._id.toString(),
            customerId:
              deposit.user.customerId ?? "",
            firstName:
              deposit.user.firstName ?? "",
            lastName:
              deposit.user.lastName ?? "",
            email:
              deposit.user.email ?? "",
          }
        : null,

      account: deposit.account
        ? {
            _id: deposit.account._id.toString(),
            accountNumber:
              deposit.account.accountNumber ?? "",
            type:
              deposit.account.type ?? "",
            nickname:
              deposit.account.nickname ?? "",
            currency:
              deposit.account.currency ?? "USD",
          }
        : null,

      submittedAt:
        deposit.submittedAt?.toISOString() ??
        null,

      approvedAt:
        deposit.approvedAt?.toISOString() ??
        null,

      rejectedAt:
        deposit.rejectedAt?.toISOString() ??
        null,

      availableAt:
        deposit.availableAt?.toISOString() ??
        null,

      reviewedAt:
        deposit.reviewedAt?.toISOString() ??
        null,

      fundsReleasedAt:
        deposit.fundsReleasedAt?.toISOString() ??
        null,

      createdAt:
        deposit.createdAt.toISOString(),

      updatedAt:
        deposit.updatedAt.toISOString(),
    })
  );

  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Mobile Check Deposits
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review and manage customer mobile check deposits.
        </p>
      </div>

      <AdminMobileCheckDeposits
        deposits={serializedDeposits}
      />
    </main>
  );
}