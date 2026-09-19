import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { pageTitle } from '@/lib/site';
import TicketLink from '@/components/TicketLink';
import { srcSet, LOGO_WIDTHS, STONE_WIDTHS } from '@/lib/img';
import e from '@/components/event/event.module.css';
import s from './cultureexpo.module.css';

export const metadata: Metadata = {
  title: pageTitle('CultureExpo™'),
  description: 'Welcome to the Expo. Fri Oct 23 to Sun Oct 25, 2026, Central Park Atlanta. Ticketed. Coming soon.',
};

const NOTE = 'Tickets on Ticketmaster. Opens in a new tab. Day and weekend options to be announced.';

export default function CultureExpoPage() {
  return (
    <section id="expo" className={`page ${s.expo}`} style={{ '--accent': '#ffffff' } as CSSProperties}>
      <Image className="bgimg" src="/assets/bg-expo.webp" alt="" fill priority sizes="100vw" style={{ opacity: 0.8 }} />
      <div aria-hidden="true" className={s.shade} />
      <img aria-hidden="true" className={s.stone} src="/assets/stone-blue.webp" srcSet={srcSet("/assets/stone-blue.webp", STONE_WIDTHS, 900)} sizes="(min-width: 1024px) 1400px, 130px" alt="" width={900} height={705}  style={{ aspectRatio: '900 / 705' }} />

      {/* Desktop */}
      <div className={`wrap ${s.wrap} only-d`}>
        <div className={e.top}>
          <div className={`hud ${e.topLine}`}>
            Fri Oct 23 to Sun Oct 25, 2026 <span className={e.sep}>/</span> Central Park Atlanta <span className={e.sep}>/</span>{' '}
            <span className="st st-ticket">Ticketed</span>
          </div>
          <Link href="/cultureverse" className={`hud ${e.back}`}>Back to the Cultureverse</Link>
        </div>
        <div className={e.hero}>
          <h1 className={e.h}><img className={e.mark} src="/assets/logo-cultureexpo.png" srcSet={srcSet("/assets/logo-cultureexpo.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 420px" alt="Culture Expo" width={1000} height={535}  style={{ aspectRatio: '1000 / 535' }} /></h1>
          <p className={`d ${e.title}`}>Welcome to the Expo</p>
          <p className={`d8 ${s.soon}`}>Coming soon</p>
          <div className={e.ctaRow}>
            <TicketLink className="btn btn-red">Get weekend tickets</TicketLink>
            <span className={`hud ${e.ctaNote}`}>{NOTE}</span>
          </div>
        </div>
        <dl className={`${e.dl} ${s.dl}`}>
          <div className={e.dlItem}><dt className="hud">Days</dt><dd className={e.dd}>Friday, Saturday, Sunday</dd></div>
          <div className={e.dlItem}><dt className="hud">Where</dt><dd className={e.dd}>Central Park Atlanta</dd></div>
          <div className={e.dlItem}><dt className="hud">Expected</dt><dd className={e.dd}>15,000+</dd></div>
          <div className={e.dlItem}><dt className="hud">Hours</dt><dd className={e.dd}>To be announced</dd></div>
        </dl>
        <div className={`${e.photos} ${s.photos}`}>
          <Image src="/assets/render-expo-entrance.webp" alt="Rendering of the Culture Expo entrance" width={1800} height={1012} sizes="(min-width: 1024px) 720px, 100vw" />
          <Image src="/assets/photo-expo-1.webp" alt="Guest at an expo" width={1240} height={1800} sizes="(min-width: 1024px) 280px, 50vw" style={{ objectPosition: '50% 20%' }} />
          <Image src="/assets/photo-expo-2.webp" alt="Guest at an expo" width={1440} height={1800} sizes="(min-width: 1024px) 280px, 50vw" style={{ objectPosition: '50% 20%' }} />
        </div>
      </div>

      {/* Mobile */}
      <div className={`wrap ${s.wrapM} only-m`}>
        <p className={`hud ${e.topM}`}>
          Fri Oct 23 to Sun Oct 25, 2026<br /><span>Central Park Atlanta</span>
        </p>
        <h1 className={s.hM}><img className={e.markM} src="/assets/logo-cultureexpo.png" srcSet={srcSet("/assets/logo-cultureexpo.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 260px" alt="Culture Expo" width={1000} height={535}  style={{ aspectRatio: '1000 / 535' }} /></h1>
        <p className={`d ${s.titleM}`}>Welcome to the Expo</p>
        <div className={e.tag}><span className="st st-ticket">Ticketed</span></div>
        <p className={`d8 ${s.soonM}`}>Coming soon</p>
        <dl className={e.dlM}>
          <div className={e.dlItemM}><dt className="hud">Days</dt><dd className={e.ddM}>Fri, Sat, Sun</dd></div>
          <div className={e.dlItemM}><dt className="hud">Expected</dt><dd className={e.ddM}>15,000+</dd></div>
          <div className={e.dlItemM}><dt className="hud">Where</dt><dd className={e.ddM}>Central Park Atlanta</dd></div>
          <div className={e.dlItemM}><dt className="hud">Hours</dt><dd className={e.ddM}>To be announced</dd></div>
        </dl>
        <div className={e.photosM} style={{ '--wide-h': '180px' } as CSSProperties}>
          <Image className={e.wide} src="/assets/render-expo-entrance.webp" alt="Rendering of the Culture Expo entrance" width={1800} height={1012} sizes="100vw" />
          <Image src="/assets/photo-expo-1.webp" alt="Guest at an expo" width={1240} height={1800} sizes="50vw" style={{ objectPosition: '50% 20%' }} />
          <Image src="/assets/photo-expo-2.webp" alt="Guest at an expo" width={1440} height={1800} sizes="50vw" style={{ objectPosition: '50% 20%' }} />
        </div>
        <div className={e.ctaM}>
          <TicketLink className="btn btn-red">Get weekend tickets</TicketLink>
          <p className={`hud ${e.noteM}`}>{NOTE}</p>
          <Link href="/cultureverse" className={`hud ${e.back} ${e.backM}`}>Back to the Cultureverse</Link>
        </div>
      </div>
    </section>
  );
}
