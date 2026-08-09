import { Container, Section, SectionHeader } from "@/components/ui";
import { FeatureCard } from "./FeatureCard";
import { features } from "./data";

export function Features() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Why Apex"
          title="Everything you need to manage your finances."
          description="From daily banking to long-term wealth building, Apex brings your financial life together in one secure platform."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}