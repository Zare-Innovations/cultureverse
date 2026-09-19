import type { Metadata } from 'next';
import '../styles/cb2.css';
import './globals.css';
import { golos, cormorant } from './fonts';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  openGraph: { images: ['/assets/logo-culturebowl.png'], siteName: SITE_NAME, type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${golos.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
