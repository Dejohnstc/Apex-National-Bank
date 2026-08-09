import {
  ShieldCheck,
  Landmark,
  Wallet,
  ArrowRightLeft,
  TrendingUp,
  Smartphone,
} from "lucide-react";

import { Feature } from "./types";

export const features: Feature[] = [
  {
    title: "Bank-grade Security",
    description:
      "Protect your money with encryption, fraud detection, and secure authentication.",
    icon: ShieldCheck,
  },
  {
    title: "Digital Accounts",
    description:
      "Open and manage checking and savings accounts from anywhere.",
    icon: Landmark,
  },
  {
    title: "Smart Wallet",
    description:
      "Track balances, budgets, and spending in one intuitive dashboard.",
    icon: Wallet,
  },
  {
    title: "Instant Transfers",
    description:
      "Move money quickly between your accounts or to other users.",
    icon: ArrowRightLeft,
  },
  {
    title: "Investments",
    description:
      "Monitor your portfolio and grow your wealth over time.",
    icon: TrendingUp,
  },
  {
    title: "Mobile Banking",
    description:
      "Access your finances securely from your phone, tablet, or desktop.",
    icon: Smartphone,
  },
];