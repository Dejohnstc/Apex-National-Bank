"use client";

import Script from "next/script";

export default function TawkChat() {
  return (
    <>
      <Script id="tawk-init" strategy="afterInteractive">
        {`
          var Tawk_API = Tawk_API || {};
          var Tawk_LoadStart = new Date();
        `}
      </Script>

      <Script
        id="tawk-script"
        strategy="afterInteractive"
        src="https://embed.tawk.to/6a78b1cacad4c71d487090bc/1jvjnd0ev"
        crossOrigin="anonymous"
      />
    </>
  );
}