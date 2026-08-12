import { notFound } from "next/navigation";

import { getAdminDeposit } from "@/services/admin/mobile-check-deposit/getAdminDeposit";

import AdminMobileCheckDepositDetail from "@/components/admin/mobile-check-deposit/AdminMobileCheckDepositDetail";

interface Props {
  params: Promise<{
    depositId: string;
  }>;
}

export default async function AdminMobileCheckDepositDetailPage({
  params,
}: Props) {
  const { depositId } = await params;

  let deposit;

  try {
    deposit =
      await getAdminDeposit(
        depositId
      );
  } catch {
    notFound();
  }

  const serializedDeposit = {
    ...deposit,

    _id: deposit._id.toString(),

    user: deposit.user
      ? {
          _id:
            deposit.user._id.toString(),
          customerId:
            deposit.user.customerId ?? "",
          firstName:
            deposit.user.firstName ?? "",
          lastName:
            deposit.user.lastName ?? "",
          email:
            deposit.user.email ?? "",
          phone:
            deposit.user.phone ?? "",
        }
      : null,

    account: deposit.account
      ? {
          _id:
            deposit.account._id.toString(),
          accountNumber:
            deposit.account.accountNumber ?? "",
          type:
            deposit.account.type ?? "",
          nickname:
            deposit.account.nickname ?? "",
          currency:
            deposit.account.currency ?? "USD",
          currentBalance:
            deposit.account.currentBalance ?? 0,
          availableBalance:
            deposit.account.availableBalance ?? 0,
        }
      : null,

    reviewedBy:
      deposit.reviewedBy
        ? {
            _id:
              deposit.reviewedBy._id.toString(),
            firstName:
              deposit.reviewedBy.firstName ?? "",
            lastName:
              deposit.reviewedBy.lastName ?? "",
            email:
              deposit.reviewedBy.email ?? "",
          }
        : null,

    fundsReleasedBy:
      deposit.fundsReleasedBy
        ? {
            _id:
              deposit.fundsReleasedBy._id.toString(),
            firstName:
              deposit.fundsReleasedBy.firstName ?? "",
            lastName:
              deposit.fundsReleasedBy.lastName ?? "",
            email:
              deposit.fundsReleasedBy.email ?? "",
          }
        : null,

    submittedAt:
      deposit.submittedAt?.toISOString() ??
      null,

    reviewedAt:
      deposit.reviewedAt?.toISOString() ??
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

    fundsReleasedAt:
      deposit.fundsReleasedAt?.toISOString() ??
      null,

    createdAt:
      deposit.createdAt.toISOString(),

    updatedAt:
      deposit.updatedAt.toISOString(),
  };

  return (
    <main className="space-y-6 p-6">
      <AdminMobileCheckDepositDetail
        deposit={serializedDeposit}
      />
    </main>
  );
}