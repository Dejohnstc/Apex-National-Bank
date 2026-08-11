import {
  LayoutDashboard,
  Landmark,
  ArrowRightLeft,
  Receipt,
  CreditCard,
  PiggyBank,
  Wallet,
  User,
  Shield,
  Settings,
  LifeBuoy,
  Bell,
  FileText,
  Zap,
  Banknote,
} from "lucide-react";

export const navigation = [
  {
    section: "MAIN",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Accounts",
        href: "/dashboard/accounts",
        icon: Landmark,
      },
      {
        title: "Transactions",
        href: "/dashboard/transactions",
        icon: Receipt,
      },
    ],
  },

  {
    section: "PAYMENTS",
    items: [
      {
        title: "Internal Transfer",
        href: "/dashboard/transfers",
        icon: ArrowRightLeft,
      },
      {
        title: "ACH Transfer",
        href: "/dashboard/ach/send",
        icon: Banknote,
      },
      {
        title: "Wire Transfer",
        href: "/dashboard/wires",
        icon: Landmark,
      },
      {
        title: "Zelle",
        href: "/dashboard/zelle",
        icon: Zap,
      },
    ],
  },

  {
    section: "BANKING",
    items: [
      {
        title: "Statements",
        href: "/dashboard/statements",
        icon: FileText,
      },
      {
        title: "Cards",
        href: "/dashboard/cards",
        icon: CreditCard,
      },
      {
        title: "Savings",
        href: "/dashboard/savings",
        icon: PiggyBank,
      },
      {
        title: "Investments",
        href: "/dashboard/investments",
        icon: Wallet,
      },
    ],
  },

  {
    section: "PROFILE",
    items: [
      {
        title: "Profile",
        href: "/dashboard/profile",
        icon: User,
      },
      {
        title: "Notifications",
        href: "/dashboard/notifications",
        icon: Bell,
      },
      {
        title: "Security",
        href: "/dashboard/security",
        icon: Shield,
      },
      
    ],
  },

  {
    section: "HELP",
    items: [
      {
        title: "Support",
        href: "/dashboard/support",
        icon: LifeBuoy,
      },
    ],
  },
];