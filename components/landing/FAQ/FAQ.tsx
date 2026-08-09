"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  Container,
  Section,
  SectionHeader,
} from "@/components/ui";

const faqs = [
  {
    question: "How do I open an Apex account?",
    answer:
      "Complete the online application, verify your identity, and you'll be ready to bank in just a few minutes.",
  },
  {
    question: "Is my money secure?",
    answer:
      "Apex uses modern encryption, fraud monitoring, and multiple layers of account protection.",
  },
  {
    question: "Can I bank from my phone?",
    answer:
      "Absolutely. Apex is fully responsive and works beautifully on desktop, tablet, and mobile devices.",
  },
  {
    question: "Do you support international transfers?",
    answer:
      "International transfers are available for eligible accounts and supported destinations.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Support is available through secure messaging, email, and phone.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know before opening an account."
        />

        <div className="mx-auto mt-16 max-w-4xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpen(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-semibold text-slate-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-200 px-6 py-5">
                    <p className="leading-7 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}