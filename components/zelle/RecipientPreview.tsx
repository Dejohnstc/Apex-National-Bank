"use client";

import { useEffect, useState } from "react";
import { lookupRecipientAction } from "@/actions/zelle/lookupRecipient";

interface Recipient {
  fullName: string;
  email: string;
  accountId: string;
  accountNumber: string;
  accountType: string;
}

interface RecipientPreviewProps {
  email: string;
  onRecipientFound: (recipient: Recipient | null) => void;
}

export default function RecipientPreview({
  email,
  onRecipientFound,
}: RecipientPreviewProps) {
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] =
    useState<Recipient | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const lookup = async () => {
      const value = email.trim();

      if (!value) {
        setRecipient(null);
        setError("");
        onRecipientFound(null);
        return;
      }

      setLoading(true);

      try {
        const result = await lookupRecipientAction(value);

        if (!result.success) {
  setRecipient(null);
  setError(result.message ?? "");
  onRecipientFound(null);
} else {
  const recipient = result.recipient ?? null;

  setRecipient(recipient);
  setError("");
  onRecipientFound(recipient);
}
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(lookup, 500);

    return () => clearTimeout(timer);
  }, [email, onRecipientFound]);

  if (!email.trim()) {
    return null;
  }

  if (loading) {
    return (
      <div className="rounded-lg border p-4 text-sm text-muted-foreground">
        Looking up recipient...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (!recipient) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-green-50 p-4">
      <div className="font-semibold">
        {recipient.fullName}
      </div>

      <div className="text-sm text-muted-foreground">
        {recipient.email}
      </div>

      <div className="mt-2 text-sm">
        {recipient.accountType}
      </div>

      <div className="text-sm text-muted-foreground">
        •••• {recipient.accountNumber.slice(-4)}
      </div>
    </div>
  );
}