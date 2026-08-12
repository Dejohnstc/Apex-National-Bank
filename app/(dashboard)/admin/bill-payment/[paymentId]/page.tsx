import { notFound } from "next/navigation";

import { getAdminBillPayment } from "@/services/admin/bill-payments/getAdminBillPayment";

import AdminBillPaymentDetail from "@/components/admin/bill-payments/AdminBillPaymentDetail";

interface Props {
  params: Promise<{
    paymentId: string;
  }>;
}

export default async function AdminBillPaymentDetailPage({
  params,
}: Props) {
  const { paymentId } =
    await params;

  let payment;

  try {
    payment =
      await getAdminBillPayment(
        paymentId
      );
  } catch {
    notFound();
  }

  const serializedPayment = {
    _id:
      payment._id.toString(),

    biller:
      payment.biller,

    category:
      payment.category,

    accountNumber:
      payment.accountNumber,

    amount:
      payment.amount,

    fee:
      payment.fee,

    memo:
      payment.memo,

    status:
      payment.status,

    paymentDate:
      payment.paymentDate
        ?.toISOString() ?? null,

    scheduledDate:
      payment.scheduledDate
        ?.toISOString() ?? null,

    reference:
      payment.reference,

    confirmationNumber:
      payment.confirmationNumber,

    isRecurring:
      payment.isRecurring,

    recurringFrequency:
      payment.recurringFrequency,

    createdAt:
      payment.createdAt.toISOString(),

    updatedAt:
      payment.updatedAt.toISOString(),

    user: payment.user
      ? {
          _id:
            payment.user._id.toString(),

          customerId:
            payment.user.customerId ??
            "",

          firstName:
            payment.user.firstName ??
            "",

          lastName:
            payment.user.lastName ??
            "",

          email:
            payment.user.email ??
            "",

          phone:
            payment.user.phone ??
            "",
        }
      : null,

    account: payment.account
      ? {
          _id:
            payment.account._id.toString(),

          accountNumber:
            payment.account.accountNumber ??
            "",

          type:
            payment.account.type ??
            "",

          nickname:
            payment.account.nickname ??
            "",

          currency:
            payment.account.currency ??
            "USD",

          currentBalance:
            payment.account.currentBalance ??
            0,

          availableBalance:
            payment.account.availableBalance ??
            0,
        }
      : null,
  };

  return (
    <main className="space-y-6 p-6">
      <AdminBillPaymentDetail
        payment={
          serializedPayment
        }
      />
    </main>
  );
}