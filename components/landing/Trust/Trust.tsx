import {
  ShieldCheck,
  Clock3,
  Smartphone,
  Headphones,
} from "lucide-react";

import {
  Container,
  Section,
  SectionHeader,
} from "@/components/ui";

const items = [
  {
    title: "Security First",
    description:
      "Modern encryption and account protection designed to safeguard your financial information.",
    icon: ShieldCheck,
  },
  {
    title: "Always Available",
    description:
      "Manage your finances whenever you need with a platform built for reliability.",
    icon: Clock3,
  },
  {
    title: "Mobile Ready",
    description:
      "A seamless experience across desktop, tablet, and mobile devices.",
    icon: Smartphone,
  },
  {
    title: "Dedicated Support",
    description:
      "Helpful support whenever you need assistance with your banking experience.",
    icon: Headphones,
  },
];

export function Trust() {
  return (
    <Section className="bg-slate-50">
      <Container>
        <SectionHeader
          eyebrow="Why Apex"
          title="Built around trust, simplicity, and reliability."
          description="Every part of Apex is designed to make managing your finances easier while keeping security and usability at the center."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="inline-flex rounded-2xl bg-emerald-100 p-4">
                  <Icon className="h-8 w-8 text-emerald-700" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}