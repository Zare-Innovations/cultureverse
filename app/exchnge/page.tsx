import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { pageTitle } from '@/lib/site';
import ExchngeForm from '@/components/forms/ExchngeForm';
import EventJsonLd from '@/components/EventJsonLd';
import { srcSet, LOGO_WIDTHS, STONE_WIDTHS } from '@/lib/img';
import e from '@/components/event/event.module.css';
import s from './exchnge.module.css';

export const metadata: Metadata = {
  title: pageTitle('The Culture EXCHNGE™'),
  description:
    'At RETREAT by The Gathering Spot, The Culture EXCHNGE™ brings leaders, creators, entrepreneurs, and cultural voices together for meaningful conversation, connection, and ideas that keep us Moving Culture Forward™.',
};

const COPY =
  'At RETREAT by The Gathering Spot, The Culture EXCHNGE™ brings leaders, creators, entrepreneurs, and cultural voices together for meaningful conversation, connection, and ideas that keep us Moving Culture Forward™.';

export default function ExchngePage() {
  return (
    <section id="exchnge" className={`page ${s.ex}`} style={{ '--accent': '#3971FF' } as CSSProperties}>
      <EventJsonLd name="The Culture EXCHNGE™" description={metadata.description as string} path="/exchnge" startDate="2026-10-22" venue="RETREAT by The Gathering Spot" />
      <div className={s.bgBox}>
        <Image className="bgimg" src="/assets/bg-exchnge.webp" alt="" fill priority sizes="100vw" style={{ objectPosition: '50% 40%', opacity: 0.5 }} />
        <div aria-hidden="true" className={s.shade} />
      </div>
      <img aria-hidden="true" className={s.sat} src="/assets/obj-orb.webp" srcSet={srcSet("/assets/obj-orb.webp", STONE_WIDTHS, 1000)} sizes="(min-width: 1024px) 340px, 170px" alt="" width={1000} height={1005} style={{ aspectRatio: '1000 / 1005' }} />

      {/* Desktop */}
      <div className={`wrap ${s.wrap} only-d`}>
        <div className={e.top}>
          <div className={`hud ${e.topLine}`}>
            Thu Oct 22, 2026 <span className={e.sep}>/</span> RETREAT by The Gathering Spot <span className={e.sep}>/</span>{' '}
            <span className={`st st-request ${s.white}`}>Request to attend</span>
          </div>
          <Link href="/cultureverse" className={`hud ${e.back}`}>Back to the CultureVerse</Link>
        </div>
        <div className={s.hero}>
          <h1 className={e.h}><img className={s.mark} src="/assets/logo-exchnge.png" srcSet={srcSet("/assets/logo-exchnge.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 443px" alt="The Culture EXCHNGE" width={1000} height={271}  style={{ aspectRatio: '1000 / 271' }} /></h1>
        </div>
        <div className={s.grid}>
          <div className={s.col}>
            <p className={`d ${s.connect}`}>Connection creates change</p>
            <p className={s.copy}>{COPY}</p>
            <Image className={s.photo} src="/assets/photo-exchnge.webp" alt="Guests in conversation at a summit" width={1800} height={1200} sizes="(min-width: 1024px) 640px, 100vw" />
          </div>
          <ExchngeForm variant="d" />
        </div>
      </div>

      {/* Mobile */}
      <div className={`wrap ${s.wrapM} only-m`}>
        <p className={`hud ${e.topM}`}>
          Thu Oct 22, 2026<br /><span>RETREAT by The Gathering Spot</span>
        </p>
        <h1 className={s.hM}><img className={s.markM} src="/assets/logo-exchnge.png" srcSet={srcSet("/assets/logo-exchnge.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 300px" alt="The Culture EXCHNGE" width={1000} height={271}  style={{ aspectRatio: '1000 / 271' }} /></h1>
        <div className={e.tag}><span className={`st st-request ${s.white}`}>Request to attend</span></div>
        <p className={`d ${s.connectM}`}>Connection creates change</p>
        <p className={s.copyM}>{COPY}</p>
        <Image className={s.photoM} src="/assets/photo-exchnge.webp" alt="Guests in conversation at a summit" width={1800} height={1200} sizes="100vw" />
        <ExchngeForm variant="m" />
        <Link href="/cultureverse" className={`hud ${e.back} ${s.backM}`}>Back to the CultureVerse</Link>
      </div>
    </section>
  );
}
