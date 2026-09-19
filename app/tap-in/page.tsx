import type { Metadata } from 'next';
import { pageTitle } from '@/lib/site';
import StayTappedIn from '@/components/StayTappedIn';

export const metadata: Metadata = {
  title: pageTitle('Stay tapped in'),
  description:
    'Get first access to CultureBowl™ announcements, artist lineups, ticket updates, exclusive experiences, merch drops, CultureVerse™ news, and so much more.',
};

export default function TapInPage() {
  return <StayTappedIn priority headingLevel="h1" />;
}
