import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { EXPO_TICKETS_ON_SALE, pageTitle } from '@/lib/site';
import TicketLink from '@/components/TicketLink';
import EventJsonLd from '@/components/EventJsonLd';
import { srcSet, LOGO_WIDTHS, STONE_WIDTHS } from '@/lib/img';
import e from '@/components/event/event.module.css';
import s from './cultureexpo.module.css';

export const metadata: Metadata = {
  title: pageTitle('CultureExpo™'),
  description: `Welcome to the Expo. Fri Oct 23 to Sun Oct 25, 2026, Central Park Atlanta. ${EXPO_TICKETS_ON_SALE ? 'Ticketed. ' : ''}Coming soon.`,
};

const COPY =
  'CultureExpo™ brings sneakerheads, collectors, creators, icons, and brands together for rare finds, exclusive drops, live media, and unforgettable culture-shifting moments. See for yourself.';

const NOTE = EXPO_TICKETS_ON_SALE
  ? 'Tickets on Ticketmaster. Opens in a new tab. Day and weekend options to be announced.'
  : 'Details to be announced. Join the list to hear first.';

/** Primary call to action: tickets once they are on sale, the Tap In list until then. */
function ExpoCta({ className }: { className?: string }) {
  return EXPO_TICKETS_ON_SALE ? (
    <TicketLink className={`btn btn-red ${className ?? ''}`}>Get weekend tickets</TicketLink>
  ) : (
    <Link className={`btn btn-red ${className ?? ''}`} href="/tap-in">Notify me</Link>
  );
}

export default function CultureExpoPage() {
  return (
    <section id="expo" className={`page ${s.expo}`} style={{ '--accent': '#ffffff', '--glow': '#3971FF' } as CSSProperties}>
      <EventJsonLd name="CultureExpo™" description={metadata.description as string} path="/cultureexpo" startDate="2026-10-23" endDate="2026-10-25" venue="Central Park Atlanta" ticketed={EXPO_TICKETS_ON_SALE} />
      <Image className="bgimg" src="/assets/bg-expo.webp" alt="" fill priority sizes="100vw" style={{ opacity: 0.8 }} />
      <div aria-hidden="true" className={s.shade} />
      {/* Desktop */}
      <div className={`wrap ${s.wrap} only-d`}>
        {/* The dark blue stone, right-aligned exactly as on the coming-world pages: same door box,
            same lit glow, plus a halo so the glow reads against the blue ground. */}
        <div aria-hidden="true" className={`door lit ${s.door}`}>
          <img className={s.stone} src="/assets/stone-blue.webp" srcSet={srcSet("/assets/stone-blue.webp", STONE_WIDTHS, 900)} sizes="(min-width: 1024px) 460px, 250px" alt="" width={900} height={705} style={{ aspectRatio: '900 / 705' }} loading="lazy" />
        </div>
        <div className={e.top}>
          <div className={`hud ${e.topLine}`}>
            Fri Oct 23 to Sun Oct 25, 2026 <span className={e.sep}>/</span> Central Park Atlanta
            {EXPO_TICKETS_ON_SALE && (
              <>
                {' '}<span className={e.sep}>/</span> <span className="st st-ticket">Ticketed</span>
              </>
            )}
          </div>
          <Link href="/cultureverse" className={`hud ${e.back}`}>Back to the CultureVerse</Link>
        </div>
        <div className={e.hero}>
          <h1 className={e.h}><img className={e.mark} src="/assets/logo-cultureexpo.png" srcSet={srcSet("/assets/logo-cultureexpo.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 420px" alt="Culture Expo" width={1000} height={535}  style={{ aspectRatio: '1000 / 535' }} /></h1>
          <p className={`d ${e.title}`}>Welcome to the Expo</p>
          <p className={s.copy}>{COPY}</p>
          <p className={`d8 ${s.soon}`}>Coming soon</p>
          <div className={e.ctaRow}>
            <ExpoCta />
            <span className={`hud ${e.ctaNote}`}>{NOTE}</span>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className={`wrap ${s.wrapM} only-m`}>
        <div aria-hidden="true" className={`door lit ${s.doorM}`}>
          <img className={s.stoneM} src="/assets/stone-blue.webp" srcSet={srcSet("/assets/stone-blue.webp", STONE_WIDTHS)} sizes="250px" alt="" width={900} height={705} style={{ aspectRatio: '900 / 705' }} />
        </div>
        <p className={`hud ${e.topM}`}>
          Fri Oct 23 to Sun Oct 25, 2026<br /><span>Central Park Atlanta</span>
        </p>
        <h1 className={s.hM}><img className={e.markM} src="/assets/logo-cultureexpo.png" srcSet={srcSet("/assets/logo-cultureexpo.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 260px" alt="Culture Expo" width={1000} height={535}  style={{ aspectRatio: '1000 / 535' }} /></h1>
        <p className={`d ${s.titleM}`}>Welcome to the Expo</p>
        <p className={s.copyM}>{COPY}</p>
        {EXPO_TICKETS_ON_SALE && <div className={e.tag}><span className="st st-ticket">Ticketed</span></div>}
        <p className={`d8 ${s.soonM}`}>Coming soon</p>
        <div className={e.ctaM}>
          <ExpoCta />
          <p className={`hud ${e.noteM}`}>{NOTE}</p>
          <Link href="/cultureverse" className={`hud ${e.back} ${e.backM}`}>Back to the CultureVerse</Link>
        </div>
      </div>
    </section>
  );
}
