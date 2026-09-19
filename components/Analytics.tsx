import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

/** GA4, only when NEXT_PUBLIC_GA_ID is set at build time. Renders nothing otherwise. */
export default function Analytics() {
  if (!/^G-[A-Z0-9]+$/.test(GA_ID)) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
