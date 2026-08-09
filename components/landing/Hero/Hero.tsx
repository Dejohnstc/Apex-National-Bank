import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { HeroContent } from "./HeroContent";
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <HeroContent />
        <DashboardPreview />
      </div>
    </section>
  );
}