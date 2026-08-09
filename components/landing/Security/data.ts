import {
  ShieldCheck,
  LockKeyhole,
  Fingerprint,
  BellRing,
} from "lucide-react";

import { SecurityFeature } from "./types";

export const securityFeatures: SecurityFeature[] = [
  {
    title: "256-bit Encryption",
    description:
      "Your information is encrypted while stored and transmitted.",
    icon: LockKeyhole,
  },
  {
    title: "Fraud Monitoring",
    description:
      "We continuously monitor account activity for unusual behavior.",
    icon: ShieldCheck,
  },
  {
    title: "Biometric Authentication",
    description:
      "Secure access using fingerprint or facial recognition on supported devices.",
    icon: Fingerprint,
  },
  {
    title: "Instant Alerts",
    description:
      "Receive notifications whenever important account activity occurs.",
    icon: BellRing,
  },
];