import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Products } from "@/components/landing/Products";
import { Security } from "@/components/landing/Security";
import { Statistics } from "@/components/landing/Statistics";
import { Trust } from "@/components/landing/Trust";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Features />
        <Products />
        <Security />
        <Statistics />
        <Trust />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </>
  );
}