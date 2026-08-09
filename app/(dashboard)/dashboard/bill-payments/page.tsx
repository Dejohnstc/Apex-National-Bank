import { auth } from "@/lib/auth";

import { getAccounts } from "@/services/account/getAccounts";
import { getPayments } from "@/services/bill-payments/getPayment";

import BillPaymentsPageClient from "./page-client";

export default async function BillPaymentsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized.");
  }

  const [payments, accounts] = await Promise.all([
    getPayments({
      userId: session.user.id,
    }),
    getAccounts(session.user.id),
  ]);

  const serializedPayments = payments.map((payment) => ({
    ...payment,
    _id: payment._id.toString(),
    user: payment.user.toString(),
    account: payment.account.toString(),
    paymentDate: payment.paymentDate?.toISOString() ?? null,
    scheduledDate:
      payment.scheduledDate?.toISOString() ?? null,
    createdAt: payment.createdAt.toISOString(),
    updatedAt: payment.updatedAt.toISOString(),
  }));

  return (
    <BillPaymentsPageClient
      initialPayments={serializedPayments}
      accounts={accounts}
    />
  );
}