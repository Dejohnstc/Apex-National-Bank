import { notFound } from "next/navigation";

import { AdminDashboardHeader } from "@/components/admin/dashboard/AdminDashboardHeader";

import { LoanDetailCard } from "@/components/admin/loans/LoanDetailCard";

import { getLoan } from "@/services/admin/loans";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function LoanPage({
  params,
}: Props) {
  const { id } = await params;

  const loan = await getLoan(id);

  if (!loan) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminDashboardHeader
        title={loan.loanNumber}
        description="Loan Details"
      />

      <LoanDetailCard
        loan={loan}
      />
    </div>
  );
}