import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import { Container } from "@/components/ui";

const company = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const banking = [
  { label: "Personal Banking", href: "/personal" },
  { label: "Business Banking", href: "/business" },
  { label: "Savings", href: "/savings" },
  { label: "Investments", href: "/investments" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Security", href: "/security" },
];

const socials = [
  {
    icon: FaFacebookF,
    href: "#",
    label: "Facebook",
  },
  {
    icon: FaXTwitter,
    href: "#",
    label: "X",
  },
  {
    icon: FaLinkedinIn,
    href: "#",
    label: "LinkedIn",
  },
  {
    icon: FaInstagram,
    href: "#",
    label: "Instagram",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-3xl font-bold text-white"
            >
              Apex
            </Link>

            <p className="mt-6 max-w-md leading-7">
              Modern banking designed for individuals and businesses.
              Secure, intuitive, and built to help you manage your
              finances with confidence.
            </p>

            <div className="mt-8 flex gap-4">
             {socials.map((social) => {
  const Icon = social.icon;

  return (
    <Link
      key={social.label}
      href={social.href}
      aria-label={social.label}
      className="rounded-xl border border-slate-700 p-3 transition-colors hover:border-emerald-500 hover:bg-emerald-600 hover:text-white"
    >
      <Icon className="h-5 w-5" />
    </Link>
  );
})}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white">
              Company
            </h3>

            <ul className="mt-6 space-y-4">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Banking */}
          <div>
            <h3 className="font-semibold text-white">
              Banking
            </h3>

            <ul className="mt-6 space-y-4">
              {banking.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white">
              Legal
            </h3>

            <ul className="mt-6 space-y-4">
              {legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Apex National Bank. All rights reserved.
            </p>

            <p className="max-w-2xl text-center text-xs leading-6 text-slate-500 md:text-right">
              Apex National Bank is a fictional banking project created for
              educational and portfolio purposes. It is not a licensed financial
              institution and does not provide real banking services.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}