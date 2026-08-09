interface ExchangeRates {
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

export async function getExchangeRates(): Promise<ExchangeRates> {
  try {
    const response = await fetch(
      "https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,CAD,NGN,JPY",
      {
        next: {
          revalidate: 900,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Exchange API unavailable.");
    }

    const data = await response.json();

    return {
      base: data.base,
      timestamp: data.date,
      rates: {
        EUR: data.rates?.EUR ?? null,
        GBP: data.rates?.GBP ?? null,
        CAD: data.rates?.CAD ?? null,
        NGN: data.rates?.NGN ?? null,
        JPY: data.rates?.JPY ?? null,
      },
    };
  } catch (error) {
    console.error("Exchange Rate Error:", error);

    return {
      base: "USD",
      timestamp: new Date().toISOString(),
      rates: {
        EUR: null,
        GBP: null,
        CAD: null,
        NGN: null,
        JPY: null,
      },
    };
  }
}