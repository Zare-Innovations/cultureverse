'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ANNOUNCED_SHOW_UTC } from '@/lib/site';
import { useCountdown } from '@/lib/countdown';
import { ANNOUNCED_ACCENT, ANNOUNCED_WHEN, HEADLINER, SUPPORTING } from '@/lib/hero';
import TicketLink from '@/components/TicketLink';
import s from './hero.module.css';

/** 02-Home-Announced-D.dc.html: the desktop hero once the headliner is announced. */
export default function AnnouncedHero() {
  const cd = useCountdown(ANNOUNCED_SHOW_UTC);
  return (
    <div className={`page ${s.hero} only-d`} style={{ '--accent': ANNOUNCED_ACCENT, '--aglow': `${ANNOUNCED_ACCENT}30` } as CSSProperties}>
      <Image className="bgimg" src="/assets/bg-navy-graffiti.webp" alt="" fill priority sizes="100vw" style={{ opacity: 0.45 }} />
      <div aria-hidden="true" className={s.shade} />
      <div aria-hidden="true" className={s.aglow} />
      <div className={s.stage}>
        <Image className={s.cutout} src="/assets/cardi-b-cutout.png" alt={HEADLINER} width={678} height={1202} priority />

        <div className={s.aLogo}>
          <img className={s.aLogoImg} src="/assets/logo-culturelive.png" alt="Culture Live" width={1000} height={502} />
          <p className={`hud ${s.aTag}`}>The culture goes live</p>
        </div>

        <div className={s.aHead}>
          <h1 className={`d ${s.aName}`}>{HEADLINER}</h1>
          <div className={s.aSub}>
            <p className={`d ${s.aHeadline}`}>Headlining CultureLive™</p>
            <p className={`d8 ${s.aWhere}`}>StarJourney Stage, Central Park Atlanta. {ANNOUNCED_WHEN}.</p>
            <p className={`d8 ${s.aPlus}`}>Plus {SUPPORTING}</p>
            <p className={`hud ${s.aLineup}`}>Full lineup to the list first</p>
            <p className={`hud ${s.aPending}`}>[ARTIST NAMES PENDING CONFIRMATION]</p>
          </div>
        </div>

        <div aria-hidden="true" className={s.rule} />
        <div className={s.aBottom}>
          <TicketLink className={`btn btn-red ${s.aTicket}`}>Get tickets</TicketLink>
          <Link className="btn btn-line" href="/culturelive">CultureLive™</Link>
          <div className={s.grow} />
          <div role="timer" aria-label="Time until the show" className={s.aTimer}>
            <span className={`d num ${s.aBig}`}>{cd.d}</span><span className={`hud ${s.aUnit}`}>Days</span>
            <span className={`d num ${s.aBig}`}>{cd.h}</span><span className={`hud ${s.aUnit}`}>Hrs</span>
            <span className={`d num ${s.aBig} ${s.aAccent}`}>{cd.m}</span><span className={`hud ${s.aUnit}`}>Min</span>
          </div>
        </div>
      </div>
    </div>
  );
}
