import { AdminDashboardHeader } from "@/components/admin/dashboard/AdminDashboardHeader";

import {
  CardPagination } from "@/components/admin/cards/CardPagination";
import  { CardSummaryCards } from "@/components/admin/cards/CardSummaryCards";
import { CardTable } from "@/components/admin/cards/CardTable";
import { CardToolbar } from "@/components/admin/cards/CardToolbar";

import { getCards } from "@/services/admin/cards";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    type?: string;
    network?: string;
    virtual?: string;
    sort?: string;
  }>;
}

export default async function CardsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const result = await getCards({
    page: Number(params.page ?? 1),

    search: params.search,

    status: params.status as
      | "ACTIVE"
      | "FROZEN"
      | "BLOCKED"
      | "EXPIRED"
      | undefined,

    type: params.type as
      | "DEBIT"
      | "CREDIT"
      | undefined,

    network: params.network as
      | "VISA"
      | "MASTERCARD"
      | undefined,

    virtual:
      params.virtual === undefined
        ? undefined
        : params.virtual === "true",

    sort: params.sort,
  });

  return (
    <div className="space-y-6">
      <AdminDashboardHeader
        title="Cards"
        description="Manage customer debit and credit cards."
      />

      <CardSummaryCards
        summary={result.summary}
      />

      <CardToolbar />

      <CardTable
        cards={result.data}
      />

      <CardPagination
        pagination={result.pagination}
      />
    </div>
  );
}