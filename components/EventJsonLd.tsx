import { SITE_URL, TICKET_URL } from '@/lib/site';

type Props = {
  name: string;
  description: string;
  path: string;
  startDate: string;
  endDate?: string;
  /** Venue as printed on the page. Omitted when the page names none. */
  venue?: string;
  ticketed?: boolean;
  free?: boolean;
};

/** schema.org Event, built only from dates and venues that already appear on the page. */
export default function EventJsonLd({ name, description, path, startDate, endDate, venue, ticketed, free }: Props) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    url: `${SITE_URL}${path}`,
    image: `${SITE_URL}/og-image.png`,
    startDate,
    ...(endDate ? { endDate } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    organizer: { '@type': 'Organization', name: 'CultureBowl™', url: SITE_URL },
    ...(venue ? { location: { '@type': 'Place', name: venue, address: { '@type': 'PostalAddress', addressLocality: 'Atlanta' } } } : {}),
    ...(ticketed ? { offers: { '@type': 'Offer', url: TICKET_URL } } : {}),
    ...(free ? { isAccessibleForFree: true } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
