import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Button,
  Container,
  Section,
} from "@/components/ui";

export function CTA() {
  return (
    <Section className="py-24">
      <Container>
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500 px-8 py-16 text-center text-white shadow-2xl md:px-16">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
            Open an account in minutes
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Modern banking built for your future.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-emerald-50">
            Whether you&apos;re managing everyday finances, growing your savings,
            or building long-term wealth, Apex gives you the tools to do it
            confidently.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-slate-100"
              >
                Open an Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-emerald-700"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}