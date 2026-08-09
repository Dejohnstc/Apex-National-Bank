import { Container, Section, SectionHeader } from "@/components/ui";
import { securityFeatures } from "./data";
import { SecurityCard } from "./SecurityCard";

export function Security() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Security"
          title="Built with security at the core."
          description="Your financial information deserves strong protection. Apex is designed with modern security practices and transparent account monitoring."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {securityFeatures.map((feature) => (
            <SecurityCard
              key={feature.title}
              feature={feature}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}