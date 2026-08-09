import { NextResponse } from "next/server";

interface ExchangeRateResponse {
  success: boolean;
  base: string;
  timestamp: string;
  rates: {
    EUR: number | null;
    GBP: number | null;
    CAD: number | null;
    NGN: number | null;
    JPY: number | null;
  };
}

let cachedRates: ExchangeRateResponse | null = null;
let lastFetch = 0;

const CACHE_TIME = 30 * 1000;

const API_KEY =
  process.env.TWELVE_DATA_API_KEY!;

export async function GET() {
  try {
    const now = Date.now();

    if (
      cachedRates &&
      now - lastFetch < CACHE_TIME
    ) {
      return NextResponse.json(cachedRates);
    }

    const pairs = [
      "USD/EUR",
      "USD/GBP",
      "USD/CAD",
      "USD/NGN",
      "USD/JPY",
    ];

    const results = await Promise.all(
      pairs.map(async (pair) => {
        const res = await fetch(
          `https://api.twelvedata.com/exchange_rate?symbol=${pair}&apikey=${API_KEY}`,
          {
            cache: "no-store",
          }
        );

        const data =
          await res.json();

        return {
          pair,
          rate:
            Number(data.rate) || null,
        };
      })
    );

    cachedRates = {
      success: true,
      base: "USD",
      timestamp:
        new Date().toISOString(),
      rates: {
        EUR:
          results.find(
            (r) =>
              r.pair === "USD/EUR"
          )?.rate ?? null,

        GBP:
          results.find(
            (r) =>
              r.pair === "USD/GBP"
          )?.rate ?? null,

        CAD:
          results.find(
            (r) =>
              r.pair === "USD/CAD"
          )?.rate ?? null,

        NGN:
          results.find(
            (r) =>
              r.pair === "USD/NGN"
          )?.rate ?? null,

        JPY:
          results.find(
            (r) =>
              r.pair === "USD/JPY"
          )?.rate ?? null,
      },
    };

    lastFetch = now;

    return NextResponse.json(
      cachedRates
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}