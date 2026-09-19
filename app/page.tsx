import type { Metadata } from 'next';
import { HEADLINER_ANNOUNCED, pageTitle } from '@/lib/site';
import { DesktopHero, MobileHero } from '@/components/home/Hero';
import AnnouncedHero from '@/components/home/AnnouncedHero';
import StayTappedIn from '@/components/StayTappedIn';

export const metadata: Metadata = {
  title: pageTitle('Home'),
  description: 'A worldwide celebration of the culture shaping today and tomorrow. See y’all there.',
};

export default function Home() {
  return (
    <>
      {HEADLINER_ANNOUNCED ? <AnnouncedHero /> : <DesktopHero />}
      <MobileHero />
      <StayTappedIn />
    </>
  );
}
