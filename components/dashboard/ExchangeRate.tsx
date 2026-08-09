"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  TrendingUp,
  Globe2,
} from "lucide-react";

interface Props {
  exchangeRates: {
    base: string;
    timestamp: string;
    rates: {
      EUR: number | null;
      GBP: number | null;
      CAD: number | null;
      NGN: number | null;
      JPY: number | null;
    };
  };
}

type ChangeState = Record<
  string,
  "up" | "down" | null
>;

export default function ExchangeRates({
  exchangeRates,
}: Props) {
  const [rates, setRates] =
    useState(exchangeRates);

  const previousRates = useRef(
    exchangeRates.rates
  );

  const [changed, setChanged] =
    useState<ChangeState>({});

  useEffect(() => {
    async function refresh() {
      try {
        const res = await fetch(
          "/api/exchange-rates",
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (!data.success) return;

        const updates: ChangeState = {};

       const currencyKeys = [
  "EUR",
  "GBP",
  "CAD",
  "NGN",
  "JPY",
] as const;

currencyKeys.forEach((code) => {
  const oldValue =
    previousRates.current[code];

  const newValue =
    data.rates[code];

  if (
    oldValue !== null &&
    newValue !== null
  ) {
    if (newValue > oldValue) {
      updates[code] = "up";
    } else if (newValue < oldValue) {
      updates[code] = "down";
    } else {
      updates[code] = null;
    }
  }
});

        previousRates.current =
          data.rates;

        setChanged(updates);

        setRates(data);

        setTimeout(() => {
          setChanged({});
        }, 1200);
      } catch (error) {
        console.error(error);
      }
    }

    const interval =
      setInterval(refresh, 30000);

    return () =>
      clearInterval(interval);
  }, []);

  const currencies = [
    {
      code: "EUR",
      name: "Euro",
      flag: "🇪🇺",
      value: rates.rates.EUR,
    },
    {
      code: "GBP",
      name: "Pound",
      flag: "🇬🇧",
      value: rates.rates.GBP,
    },
    {
      code: "CAD",
      name: "Canadian Dollar",
      flag: "🇨🇦",
      value: rates.rates.CAD,
    },
    {
      code: "NGN",
      name: "Naira",
      flag: "🇳🇬",
      value: rates.rates.NGN,
    },
    {
      code: "JPY",
      name: "Yen",
      flag: "🇯🇵",
      value: rates.rates.JPY,
    },
  ];

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="rounded-2xl bg-emerald-100 p-3">

            <Globe2 className="h-6 w-6 text-emerald-700" />

          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Live Exchange Rates
            </h2>

            <p className="text-sm text-slate-500">
              Base Currency: USD
            </p>

          </div>

        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          LIVE
        </span>

      </div>

      {/* Rates */}

      <div className="grid grid-cols-2 gap-4 p-5 md:grid-cols-3 xl:grid-cols-5">

        {currencies.map((currency) => (

          <div
            key={currency.code}
            className={`rounded-2xl border p-4 transition-all duration-700 ${
              changed[currency.code] ===
              "up"
                ? "border-emerald-300 bg-emerald-50 ring-2 ring-emerald-200"
                : changed[
                      currency.code
                    ] === "down"
                  ? "border-red-300 bg-red-50 ring-2 ring-red-200"
                  : "border-slate-200 bg-slate-50"
            }`}
          >

            <div className="flex items-center justify-between">

              <span className="text-3xl">
                {currency.flag}
              </span>

              <TrendingUp
                className={`h-4 w-4 transition-all duration-500 ${
                  changed[
                    currency.code
                  ] === "up"
                    ? "scale-125 text-emerald-600"
                    : changed[
                          currency.code
                        ] === "down"
                      ? "rotate-180 scale-125 text-red-600"
                      : "text-slate-400"
                }`}
              />

            </div>

            <div className="mt-5">

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {currency.code}
              </p>

              <h3
                className={`mt-2 text-2xl font-bold tracking-tight transition-colors duration-700 ${
                  changed[
                    currency.code
                  ] === "up"
                    ? "text-emerald-700"
                    : changed[
                          currency.code
                        ] === "down"
                      ? "text-red-700"
                      : "text-slate-900"
                }`}
              >

                {currency.value === null
                  ? "--"
                  : currency.value.toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4,
                      }
                    )}

              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {currency.name}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t px-6 py-4">

        <p className="text-xs text-slate-500">
          Updated {new Date(rates.timestamp).toLocaleTimeString()}
        </p>

        <Link
          href="/dashboard/exchange"
          className="flex items-center gap-1 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
        >

          Currency Converter

          <ArrowRight className="h-4 w-4" />

        </Link>

      </div>

    </section>
  );
}