import {
  Landmark,
  Building2,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

import { Product } from "./types";

export const products: Product[] = [
  {
    title: "Personal Banking",
    description:
      "Checking, savings, debit cards, and everyday banking built for modern life.",
    icon: Landmark,
  },
  {
    title: "Business Banking",
    description:
      "Powerful banking tools designed to help businesses grow and manage cash flow.",
    icon: Building2,
  },
  {
    title: "Savings",
    description:
      "Automate your savings and work toward your financial goals with confidence.",
    icon: PiggyBank,
  },
  {
    title: "Investments",
    description:
      "Track your portfolio and grow your wealth through long-term investing.",
    icon: TrendingUp,
  },
];