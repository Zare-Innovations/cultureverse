import type { ReactNode, CSSProperties } from 'react';
import { TICKET_URL } from '@/lib/site';

/** Every ticket button opens Ticketmaster in a new tab. */
export default function TicketLink({
  className,
  children,
  style,
  ariaLabel,
}: {
  className: string;
  children: ReactNode;
  style?: CSSProperties;
  ariaLabel?: string;
}) {
  return (
    <a className={className} href={TICKET_URL} target="_blank" rel="noopener" style={style} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
