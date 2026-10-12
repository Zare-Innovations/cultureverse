import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { pageTitle } from '@/lib/site';
import { HEADLINER, SUPPORTING } from '@/lib/hero';
import Reveal from '@/components/Reveal';
import Ticker from '@/components/Ticker';
import { srcSet, LOGO_WIDTHS } from '@/lib/img';
import e from '@/components/event/event.module.css';
import s from './culturelive.module.css';

export const metadata: Metadata = {
  title: pageTitle('CultureLive™'),
  description: 'CultureLive™ is where the energy lives. We bring the icons, the sound, and unforgettable performances.',
};

const NOTE = 'Dates and tickets to be announced. Join the list to hear first.';

/** The ticker between the announcement and the lineup: what, when, where, who. */
const TICKER = ['CultureLive™', 'Dates to come', 'StarJourney Stage', 'Central Park Atlanta', HEADLINER, SUPPORTING, 'Full lineup to the list first'];

export default function CultureLivePage() {
  return (
    <section id="live" className={`page ${s.live}`} style={{ '--accent': '#FF6F00' } as CSSProperties}>
      <div className={s.bgBox}>
        <Image className={`bgimg ${s.bg}`} src="/assets/bg-culturelive.webp" alt="" fill priority sizes="100vw" />
        <div aria-hidden="true" className={s.shade} />
      </div>

      {/* Desktop */}
      <div className={`wrap ${s.wrap} only-d`}>
        <div className={e.top}>
          <div className={`hud ${e.topLine}`}>
            Dates to come <span className={e.sep}>/</span> StarJourney Stage, Central Park Atlanta <span className={e.sep}>/</span>{' '}
            <span className="st st-tba">Coming soon</span>
          </div>
          <Link href="/cultureverse" className={`hud ${e.back}`}>Back to the CultureVerse</Link>
        </div>
        <div className={e.hero}>
          <h1 className={e.h}><img className={`a-in ${e.mark}`} src="/assets/logo-culturelive.png" srcSet={srcSet("/assets/logo-culturelive.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 420px" alt="Culture Live" width={1000} height={502}  style={{ aspectRatio: '1000 / 502', '--d': '80ms' } as CSSProperties} /></h1>
          <p className={`d a-wipe ${e.title}`} style={{ '--d': '380ms' } as CSSProperties}>The culture goes live</p>
          <p className={`a-in ${e.copy}`} style={{ '--d': '700ms' } as CSSProperties}>CultureLive™ is where the energy lives. We bring the icons, the sound, and unforgettable performances.</p>
          <p className={`a-in ${e.copy}`} style={{ '--d': '840ms' } as CSSProperties}>Don’t follow the moment--let’s make it.</p>
          <div className={e.ctaRow}>
            <Link className="btn btn-red" href="/tap-in">Notify me</Link>
            <span className={`hud ${e.ctaNote}`}>{NOTE}</span>
          </div>
        </div>
        <div className={s.talent}>
          <div className={s.talentCol}>
            <span className={`hud ${s.orange}`}>Talent announcement</span>
            <span className={`d ${s.headliner}`}><span aria-hidden="true" className={s.pulse} />{HEADLINER}</span>
            <span className={`d8 ${s.plus}`}>Plus {SUPPORTING}</span>
            <span className={`hud ${s.pending}`}>[ARTIST NAMES PENDING CONFIRMATION]</span>
          </div>
          <dl className={`${e.dl} ${s.dl}`}>
            <div className={e.dlItem}><dt className="hud">Dates</dt><dd className={e.dd}>To be announced</dd></div>
            <div className={e.dlItem}><dt className="hud">Stage</dt><dd className={e.dd}>StarJourney Stage</dd></div>
            <div className={e.dlItem}><dt className="hud">Set times</dt><dd className={e.dd}>To be announced</dd></div>
          </dl>
        </div>
        <Ticker items={TICKER} className={s.ticker} />
        <Reveal className={s.lineup}>
          <h2 className={`d ${s.lineupH}`}>The lineup</h2>
          <p className={`hud ${s.orange} ${s.lineupNote}`}>Headliner confirmed. The rest of the bill lands soon.</p>
          <div className={s.acts}>
            <Reveal delay={0}>
              <article className={s.act}>
                <div className={s.actArt}>
                  <Image className={s.actImg} src="/assets/cardi-b-cutout.png" alt={HEADLINER} width={678} height={1202} sizes="(min-width: 1024px) 300px, 45vw" />
                </div>
                <p className={`d ${s.actName}`}>{HEADLINER}</p>
                <p className={`hud ${s.actRole}`}>Headlining</p>
              </article>
            </Reveal>
            {[0, 1, 2].map((i) => (
              <Reveal key={i} delay={120 * (i + 1)}>
                <article className={s.act}>
                  <div aria-hidden="true" className={`${s.actArt} ${s.actSlot}`}><span className={`hud ${s.slotText}`}>To be<br />announced</span></div>
                  <p className={`d ${s.actName} ${s.actNameTba}`}>To be announced</p>
                  <p className={`hud ${s.actRole}`}>Performing</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>
        <Reveal className={`${e.photos} ${s.photos}`}>
          <Image src="/assets/render-starjourney-stage.jpg" alt="Rendering of the StarJourney Stage" width={1400} height={1312} sizes="(min-width: 1024px) 640px, 100vw" style={{ objectPosition: '50% 30%' }} />
          <Image src="/assets/photo-live-1.webp" alt="Crowd at a live show" width={1800} height={1350} sizes="(min-width: 1024px) 320px, 50vw" />
          <Image src="/assets/photo-live-2.webp" alt="Performer on stage" width={1276} height={1800} sizes="(min-width: 1024px) 320px, 50vw" style={{ objectPosition: '50% 30%' }} />
        </Reveal>
      </div>

      {/* Mobile */}
      <div className={`wrap ${s.wrapM} only-m`}>
        <p className={`hud ${e.topM}`}>
          Dates to come<br /><span>StarJourney Stage, Central Park Atlanta</span>
        </p>
        <h1 className={s.hM}><img className={e.markM} src="/assets/logo-culturelive.png" srcSet={srcSet("/assets/logo-culturelive.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 260px" alt="Culture Live" width={1000} height={502}  style={{ aspectRatio: '1000 / 502' }} /></h1>
        <p className={`d ${s.titleM}`}>The culture goes live</p>
        <div className={e.tag}><span className="st st-tba">Coming soon</span></div>
        <p className={`${e.copyM} ${s.copyM1}`}>CultureLive™ is where the energy lives. We bring the icons, the sound, and unforgettable performances.</p>
        <p className={`${e.copyM} ${s.copyM2}`}>Don’t follow the moment--let’s make it.</p>
        <div className={s.talentM}>
          <span className={`hud ${s.orange}`}>Talent announcement</span>
          <span className={`d ${s.headlinerM}`}>{HEADLINER}</span>
          <span className={`d8 ${s.plusM}`}>Plus {SUPPORTING}</span>
          <span className={`hud ${s.pendingM}`}>[ARTIST NAMES PENDING CONFIRMATION]</span>
        </div>
        <dl className={e.dlM}>
          <div className={e.dlItemM}><dt className="hud">Dates</dt><dd className={e.ddM}>To be announced</dd></div>
          <div className={e.dlItemM}><dt className="hud">Set times</dt><dd className={e.ddM}>To be announced</dd></div>
        </dl>
        <Ticker items={TICKER} className={s.tickerM} />
        <Reveal className={s.lineupM}>
          <h2 className={`d ${s.lineupHM}`}>The lineup</h2>
          <div className={s.actsM}>
            <article className={s.act}>
              <div className={s.actArt}>
                <Image className={s.actImg} src="/assets/cardi-b-cutout.png" alt={HEADLINER} width={678} height={1202} sizes="45vw" />
              </div>
              <p className={`d ${s.actNameM}`}>{HEADLINER}</p>
              <p className={`hud ${s.actRole}`}>Headlining</p>
            </article>
            {[0, 1].map((i) => (
              <article key={i} className={s.act}>
                <div aria-hidden="true" className={`${s.actArt} ${s.actSlot}`}><span className={`hud ${s.slotText}`}>To be<br />announced</span></div>
                <p className={`d ${s.actNameM} ${s.actNameTba}`}>To be announced</p>
                <p className={`hud ${s.actRole}`}>Performing</p>
              </article>
            ))}
          </div>
        </Reveal>
        <Reveal className={e.photosM}>
          <Image className={e.wide} src="/assets/render-starjourney-stage.jpg" alt="Rendering of the StarJourney Stage" width={1400} height={1312} sizes="100vw" style={{ objectPosition: '50% 30%' }} />
          <Image src="/assets/photo-live-1.webp" alt="Crowd at a live show" width={1800} height={1350} sizes="50vw" />
          <Image src="/assets/photo-live-2.webp" alt="Performer on stage" width={1276} height={1800} sizes="50vw" style={{ objectPosition: '50% 30%' }} />
        </Reveal>
        <div className={e.ctaM}>
          <Link className={`btn btn-red ${e.btn}`} href="/tap-in">Notify me</Link>
          <p className={`hud ${e.noteM}`}>{NOTE}</p>
          <Link href="/cultureverse" className={`hud ${e.back} ${e.backM}`}>Back to the CultureVerse</Link>
        </div>
      </div>
    </section>
  );
}
