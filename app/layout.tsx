import type { Metadata } from 'next';
import '../styles/cb2.css';
import './globals.css';
import { golos, cormorant } from './fonts';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TicketBar from '@/components/TicketBar';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  openGraph: { images: ['/assets/logo-culturebowl.png'], siteName: SITE_NAME, type: 'website' },
};

export const viewport = { themeColor: '#111821' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${golos.variable} ${cormorant.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <TicketBar />
      </body>
    </html>
  );
}
