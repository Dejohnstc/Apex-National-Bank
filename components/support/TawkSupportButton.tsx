"use client";

import { useState } from "react";
import Script from "next/script";
import { ArrowRight, MessageCircle } from "lucide-react";

interface TawkApi {
  onLoad?: (callback: () => void) => void;
  hideWidget?: () => void;
  showWidget?: () => void;
  toggle?: () => void;
}

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

export default function TawkSupportButton() {
  const [loaded, setLoaded] = useState(false);

  function openChat() {
    if (!window.Tawk_API) return;

    if (window.Tawk_API.showWidget) {
      window.Tawk_API.showWidget();
    }

    if (window.Tawk_API.toggle) {
      window.Tawk_API.toggle();
    }
  }

  return (
    <>
      <Script id="tawk-init" strategy="afterInteractive">
        {`
          window.Tawk_API = window.Tawk_API || {};
          window.Tawk_LoadStart = new Date();

          window.Tawk_API.onLoad = function() {
            window.Tawk_API.hideWidget();
          };
        `}
      </Script>

      <Script
        id="tawk-script"
        strategy="afterInteractive"
        src="https://embed.tawk.to/6a78b1cacad4c71d487090bc/1jvjnd0ev"
        crossOrigin="anonymous"
        onLoad={() => {
          setLoaded(true);
        }}
      />

      <button
        type="button"
        onClick={openChat}
        disabled={!loaded}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <MessageCircle className="h-4 w-4" />

        {loaded
          ? "Start a conversation"
          : "Loading chat..."}

        <ArrowRight className="h-4 w-4 transition-transform hover:translate-x-1" />
      </button>
    </>
  );
}