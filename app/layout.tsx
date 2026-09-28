import type { Metadata } from 'next';
import '../styles/cb2.css';
import './globals.css';
import { golos, cormorant } from './fonts';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TicketBar from '@/components/TicketBar';
import Analytics from '@/components/Analytics';
import { PREVIEW_RUNTIME, RELATIVE_PREVIEW } from '@/lib/previewRuntime';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CultureBowl 2026' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
};

export const viewport = { themeColor: '#111821' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${golos.variable} ${cormorant.variable}`}>
      <body>
        {/* Scroll-reveal elements start hidden and are lifted in by components/Reveal.tsx.
            Without JS nothing would ever reveal them, so flatten the class outright. */}
        <noscript><style>{`.rv{opacity:1!important;transform:none!important}`}</style></noscript>
        {RELATIVE_PREVIEW && <script dangerouslySetInnerHTML={{ __html: PREVIEW_RUNTIME }} />}
        <a className="skip" href="#main">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <TicketBar />
        <Analytics />
      </body>
    </html>
  );
}
