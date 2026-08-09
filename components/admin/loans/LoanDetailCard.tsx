import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { AdminLoan } from "@/services/admin/loans";

interface Props {
  loan: AdminLoan;
}

export function LoanDetailCard({
  loan,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Loan Details
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        <Row
          label="Loan Number"
          value={loan.loanNumber}
        />

        <Row
          label="Loan Type"
          value={loan.type}
        />

        <Row
          label="Status"
          value={loan.status}
        />

        <Row
          label="Principal"
          value={`$${loan.principal.toLocaleString()}`}
        />

        <Row
          label="Interest Rate"
          value={`${loan.interestRate}%`}
        />

        <Row
          label="Term"
          value={`${loan.termMonths} Months`}
        />

        <Row
          label="Monthly Payment"
          value={`$${loan.monthlyPayment.toLocaleString()}`}
        />

        <Row
          label="Remaining Balance"
          value={`$${loan.remainingBalance.toLocaleString()}`}
        />
      </CardContent>
    </Card>
  );
}

interface RowProps {
  label: string;
  value: ReactNode;
}

function Row({
  label,
  value,
}: RowProps) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="font-medium">
        {value}
      </span>
    </div>
  );
}