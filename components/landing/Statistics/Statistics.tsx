import {
  Container,
  Section,
  SectionHeader,
} from "@/components/ui";

import { statistics } from "./data";
import { StatCard } from "./StatCard";

export function Statistics() {
  return (
    <Section className="bg-slate-950">
      <Container>
        <SectionHeader
          eyebrow="By The Numbers"
          title="Built for scale."
          description="A modern banking platform designed for reliability, performance, and long-term growth."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {statistics.map((stat) => (
            <StatCard
              key={stat.label}
              stat={stat}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}