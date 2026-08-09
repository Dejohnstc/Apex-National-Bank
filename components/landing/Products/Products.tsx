import { Container, Section, SectionHeader } from "@/components/ui";
import { ProductCard } from "./ProductCard";
import { products } from "./data";

export function Products() {
  return (
    <Section className="bg-slate-50">
      <Container>
        <SectionHeader
          eyebrow="Products"
          title="Banking solutions for every stage of life."
          description="Whether you're managing daily expenses, growing a business, saving for the future, or investing for tomorrow, Apex gives you the tools to succeed."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard
              key={product.title}
              product={product}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}