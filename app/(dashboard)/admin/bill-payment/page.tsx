import { getAdminBillPayments } from "@/services/admin/bill-payments/getAdminBillPayments";

import  AdminBillPayments  from "@/components/admin/bill-payments/AdminBillPayments";

export default async function AdminBillPaymentsPage() {
  const payments =
    await getAdminBillPayments();

  const serializedPayments =
    payments.map((payment) => ({
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
          }
        : null,
    }));

  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Bill Payments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage customer bill payments.
        </p>
      </div>

      <AdminBillPayments
        payments={
          serializedPayments
        }
      />
    </main>
  );
}