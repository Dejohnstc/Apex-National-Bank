import { auth } from "@/lib/auth/auth";

import { redirect } from "next/navigation";

import BeneficiariesPageClient from "./page-clients";

import { getBeneficiaries } from "@/services/beneficiaries/getBeneficiaries";

export default async function BeneficiariesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const beneficiaries =
    await getBeneficiaries(
      session.user.id
    );

  return (
    <BeneficiariesPageClient
      beneficiaries={JSON.parse(
        JSON.stringify(
          beneficiaries
        )
      )}
    />
  );
}