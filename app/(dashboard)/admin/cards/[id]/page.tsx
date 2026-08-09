import { notFound } from "next/navigation";

import { AdminDashboardHeader } from "@/components/admin/dashboard/AdminDashboardHeader";

import { CardDetailCard } from "@/components/admin/cards/CardDetailCard";

import { getCard } from "@/services/admin/cards";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CardPage({
  params,
}: Props) {
  const { id } = await params;

  const card = await getCard(id);

  if (!card) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminDashboardHeader
        title={card.holderName}
        description={`•••• ${card.last4}`}
      />

      <CardDetailCard
        card={card}
      />
    </div>
  );
}