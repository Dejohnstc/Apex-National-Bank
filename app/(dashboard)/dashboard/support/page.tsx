import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  WalletCards,
  Zap,
} from "lucide-react";
import TawkSupportButton from "@/components/support/TawkSupportButton";
const topics = [
  {
    title: "Accounts & Profile",
    description:
      "Manage your account information, profile, and banking details.",
    icon: WalletCards,
    href: "#accounts",
  },
  {
    title: "Transfers",
    description:
      "Get help with wire, ACH, and internal transfers.",
    icon: Zap,
    href: "#transfers",
  },
  {
    title: "Cards",
    description:
      "Find assistance with your debit and virtual cards.",
    icon: WalletCards,
    href: "#cards",
  },
  {
    title: "Security",
    description:
      "Learn about account security and protecting your information.",
    icon: ShieldCheck,
    href: "#security",
  },
];

export default function SupportPage() {
  return (
    <div className="space-y-8">

      {/* Hero */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-6 py-8 text-white shadow-xl sm:px-8 sm:py-10">

        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 max-w-3xl">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5">

            <MessageCircle className="h-4 w-4 text-emerald-300" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Support Center
            </span>

          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How can we help?
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Find answers, contact our support team, or get help with
            your banking services.
          </p>

          {/* Search */}

          <div className="relative mt-7 max-w-2xl">

            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              placeholder="Search help and support..."
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/10 pl-12 pr-4 text-sm text-white outline-none backdrop-blur transition placeholder:text-slate-400 focus:border-emerald-400/50 focus:bg-white/15"
            />

          </div>

        </div>

      </section>

      {/* Contact Options */}

      <section className="grid gap-5 md:grid-cols-2">

        {/* Live Chat */}

        <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg">

          <div className="flex items-start justify-between">

            <div className="rounded-2xl bg-emerald-100 p-3">
              <MessageCircle className="h-6 w-6 text-emerald-700" />
            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Available
            </span>

          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Live Chat
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Chat with a support representative for assistance with
            your banking account.
          </p>

       <TawkSupportButton />

        </div>

        {/* Phone / WhatsApp */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="rounded-2xl bg-blue-100 p-3 w-fit">
            <Phone className="h-6 w-6 text-blue-700" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Contact Support
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Reach our support team by phone or WhatsApp.
          </p>

          <div className="mt-5 space-y-3">

            <a
              href="tel:+17182184858"
              className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              <span>+1 (718) 218-4858</span>
              <Phone className="h-4 w-4 text-slate-400" />
            </a>

            <a
              href="https://wa.me/17182184858"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
            >
              <span>Contact on WhatsApp</span>
              <MessageCircle className="h-4 w-4" />
            </a>

          </div>

        </div>

      </section>

      {/* Help Topics */}

      <section>

        <div className="mb-5 flex items-end justify-between">

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Help Topics
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Browse common areas of support.
            </p>
          </div>

          <Link
            href="#all-help"
            className="hidden items-center gap-1 text-sm font-semibold text-emerald-700 sm:flex"
          >
            View all
            <ChevronRight className="h-4 w-4" />
          </Link>

        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          {topics.map((topic) => {
            const Icon = topic.icon;

            return (
              <Link
                key={topic.title}
                href={topic.href}
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
              >

                <div className="flex items-start gap-4">

                  <div className="rounded-2xl bg-slate-100 p-3 transition-colors group-hover:bg-emerald-50">
                    <Icon className="h-5 w-5 text-slate-600 group-hover:text-emerald-700" />
                  </div>

                  <div className="min-w-0 flex-1">

                    <h3 className="font-bold text-slate-900">
                      {topic.title}
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      {topic.description}
                    </p>

                  </div>

                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600" />

                </div>

              </Link>
            );
          })}

        </div>

      </section>

      {/* Help Center */}

      <section
        id="all-help"
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-4">

            <div className="rounded-2xl bg-emerald-100 p-3">
              <BookOpen className="h-6 w-6 text-emerald-700" />
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Help Center
              </h2>

              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                Browse guides and answers to common banking questions.
              </p>

            </div>

          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Browse Articles
            <ArrowRight className="h-4 w-4" />
          </button>

        </div>

      </section>

    </div>
  );
}