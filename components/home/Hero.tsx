'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import CbLogo from '@/components/CbLogo';
import Image from 'next/image';
import Link from 'next/link';
import { OPENING_NIGHT_UTC } from '@/lib/site';
import { useCountdown } from '@/lib/countdown';
import { HEADLINER, SHARDS_D, SHARDS_M, SUPPORTING } from '@/lib/hero';
import type { EventKey, WorldKey } from '@/lib/worlds';
import TicketLink from '@/components/TicketLink';
import { srcSet, STONE_WIDTHS } from '@/lib/img';
import s from './hero.module.css';

const u = (n: number) => `calc(${n} * var(--u))`;

/** Main.dc.html: desktop hero, scaled from the 1440 x 900 frame. */
export function DesktopHero() {
  const cd = useCountdown(OPENING_NIGHT_UTC);
  const [active, setActive] = useState<EventKey | WorldKey>('honors');
  const root = useRef<HTMLDivElement>(null);

  // Cursor parallax (skipped under prefers-reduced-motion).
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    const leave = () => {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <div ref={root} className={`page ${s.hero} only-d`}>
      <Image className="bgimg" src="/assets/bg-navy-graffiti.webp" alt="" fill priority sizes="100vw" style={{ opacity: 0.55 }} />
      <div aria-hidden="true" className={s.glow} />
      <div aria-hidden="true" className={s.stars} />
      <div aria-hidden="true" className={`a-field ${s.fieldD}`} />

      {/* Everything placed on the 1440 x 900 frame sits on a centered stage; the backgrounds above stay full-bleed. */}
      <div className={s.stage}>
        <p className={`hud a-in ${s.tagline}`} style={{ '--d': '1300ms' } as CSSProperties}>
          A worldwide celebration of culture <span className={s.slash}>/</span> Oct 21 to 25, 2026 <span className={s.slash}>/</span> First home: Atlanta
        </p>

        <div className={s.logoBlock}>
          <p className={`hud a-in ${s.aboveLogo}`} style={{ '--d': '1200ms' } as CSSProperties}>A worldwide celebration of culture</p>
          <h1 className={s.h1}>
            <CbLogo className={s.logo} stackClassName="a-lock" alt="CultureBowl 2026" />
          </h1>
          <img className={`a-in ${s.iheart}`} src="/assets/logo-powered-by-iheart.png" alt="Powered by iHeartMedia" width={1000} height={61} style={{ '--d': '1500ms' } as CSSProperties} />
        </div>

        <div className={`a-wipe ${s.band}`} style={{ '--d': '300ms' } as CSSProperties}>
          <div className={s.bandInner}>
            <div role="timer" aria-label="Time until opening night" className={s.timer}>
              <div className={s.unit}><span className={`d num ${s.big}`}>{cd.d}</span><span className={`hud ${s.unitLbl}`}>Days</span></div>
              <div className={s.unit}><span className={`d num ${s.big}`}>{cd.h}</span><span className={`hud ${s.unitLbl}`}>Hrs</span></div>
              <div className={s.unit}><span className={`d num ${s.big}`}>{cd.m}</span><span className={`hud ${s.unitLbl}`}>Min</span></div>
              <div className={s.unit}><span className={`d num ${s.big} ${s.red}`}>{cd.s}</span><span className={`hud ${s.unitLbl}`}>Sec</span></div>
            </div>
            <div className={`hud ${s.until}`}>
              Until opening night
              <br />
              Wed Oct 21, ICON HONORS
            </div>
            <div aria-hidden="true" className={s.divider} />
            <div className={s.liveBlock}>
              <span className={`d ${s.liveName}`}>CultureLive™</span>
              <span className={`d8 ${s.liveDate}`}>Coming soon</span>
            </div>
            <TicketLink className={`btn btn-red btn-sm ${s.bandBtn}`}>Get tickets</TicketLink>
          </div>
        </div>

        {SHARDS_D.map((sh) => {
          const on = active === sh.id;
          return (
            <div
              key={sh.id}
              className={`par ${s.par}`}
              style={{ left: u(sh.x), top: u(sh.y), width: u(sh.w), '--dp': sh.dp } as CSSProperties}
            >
              <div className="a-assemble" style={{ '--fx': u(sh.fx), '--fy': u(sh.fy), '--fr': `${sh.fr}deg`, '--d': `${sh.d}ms` } as CSSProperties}>
                <Link
                  className={`door ${on ? 'lit' : ''} ${s.door}`}
                  href={sh.href}
                  aria-label={`${sh.name}, ${sh.day}, ${sh.status}`}
                  onMouseEnter={() => setActive(sh.id)}
                  onFocus={() => setActive(sh.id)}
                  style={{ width: u(sh.w), transform: `rotate(${sh.rot}deg)`, '--glow': sh.glow } as CSSProperties}
                >
                  <img src={sh.src} srcSet={srcSet(sh.src, STONE_WIDTHS, sh.iw)} sizes="(min-width: 1024px) 1400px, 1400px" alt="" width={sh.iw} height={sh.ih} className={s.stoneImg} loading="lazy"  style={{ aspectRatio: `${sh.iw} / ${sh.ih}` }} />
                </Link>
                {on && (
                  <div className={`hud ${s.label}`} style={{ left: u(sh.lx), top: u(sh.ly), borderLeftColor: sh.glow }}>
                    {sh.day}
                    <br />
                    <span className={s.labelName}>{sh.name}</span>
                    <br />
                    {sh.status}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div className={s.headliner}>
          <span className={`hud ${s.navyText}`}>Headlining CultureLive™</span>
          <span className={`d ${s.headName}`}>{HEADLINER}</span>
          <span className={`d8 ${s.headPlus}`}>Plus {SUPPORTING}</span>
          <Link href="/tap-in" className={`hud ${s.headLink}`}>Full lineup to the list first</Link>
          <span className={`hud ${s.pending}`}>[ARTIST NAMES PENDING CONFIRMATION]</span>
        </div>
      </div>

      {/* In flow, so the hero grows past the frame when the copy and buttons need the room at narrow desktop widths. */}
      <div className={s.col}>
        <div className={s.what}>
          <p className={`hud a-in ${s.whatHud}`} style={{ '--d': '1500ms' } as CSSProperties}>What is CultureBowl?</p>
          <p className={`a-in ${s.whatCopy}`} style={{ '--d': '1600ms' } as CSSProperties}>
            A worldwide celebration of the culture shaping today and tomorrow. See y’all there.
          </p>
          <div className={s.whatBtns}>
            <TicketLink className="btn btn-white">Get tickets</TicketLink>
            <Link className="btn btn-navy" href="/about">Learn more</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 01-Home-M.dc.html: mobile hero on the 390 x 844 frame. Used for both hero variants. */
export function MobileHero() {
  const cd = useCountdown(OPENING_NIGHT_UTC);
  const [active, setActive] = useState<EventKey>('live');
  const cur = SHARDS_M.find((x) => x.id === active) ?? SHARDS_M[1];
  const pick = useCallback((id: EventKey) => setActive(id), []);

  return (
    <div className={`page field-dim ${s.heroM} only-m`}>
      <Image className="bgimg" src="/assets/bg-navy-graffiti.webp" alt="" fill priority sizes="100vw" style={{ opacity: 0.5, objectPosition: '50% 0%' }} />
      <div aria-hidden="true" className={s.glowM} />
      <div aria-hidden="true" className={`a-field ${s.fieldM}`} />

      <p className={`hud a-in ${s.taglineM}`} style={{ '--d': '1300ms' } as CSSProperties}>A worldwide celebration of culture</p>
      <p className={`hud ${s.dateM}`}>
        Oct 21 to 25, 2026 <span className={s.slashM}>/</span> First home: Atlanta
      </p>

      <div className={s.logoBlockM}>
        <h1 className={s.h1}>
          <CbLogo className={s.logoM} stackClassName="a-lock" alt="CultureBowl 2026" />
        </h1>
        <img className={`a-in ${s.iheartM}`} src="/assets/logo-powered-by-iheart.png" alt="Powered by iHeartMedia" width={1000} height={61} style={{ '--d': '1500ms' } as CSSProperties} />
        <img className={`a-in ${s.mcfM}`} src="/assets/logo-moving-culture-forward.png" alt="Moving Culture Forward" width={1000} height={54} style={{ '--d': '1700ms' } as CSSProperties} />
      </div>

      {SHARDS_M.map((sh) => {
        const on = active === sh.id;
        const pos: CSSProperties = sh.right !== undefined ? { right: sh.right } : { left: sh.x };
        return (
          <div
            key={sh.id}
            className={`a-assemble ${s.shardM}`}
            style={{ ...pos, top: sh.y, width: sh.w, '--fx': `${sh.fx}px`, '--fy': `${sh.fy}px`, '--fr': `${sh.fr}deg`, '--d': `${sh.d}ms` } as CSSProperties}
          >
            <button
              type="button"
              className={`door ${on ? 'lit' : ''} ${s.door}`}
              aria-label={`${sh.name}, ${sh.day}`}
              aria-pressed={on}
              onClick={() => pick(sh.id)}
              style={{ width: sh.w, transform: `rotate(${sh.rot}deg)`, '--glow': sh.glow } as CSSProperties}
            >
              <img src={sh.src} srcSet={srcSet(sh.src, STONE_WIDTHS, sh.iw)} sizes={`(min-width: 1024px) 1400px, ${sh.w}px`} alt="" width={sh.iw} height={sh.ih} className={s.stoneImg}  style={{ aspectRatio: `${sh.iw} / ${sh.ih}` }} />
            </button>
          </div>
        );
      })}

      <div className={`a-wipe ${s.bandM}`} style={{ '--d': '300ms' } as CSSProperties}>
        <div className={s.bandInnerM}>
          <div role="timer" aria-label="Time until opening night" className={s.timerM}>
            <div className={s.timerRowM}>
              <span className={`d num ${s.bigM}`}>{cd.d}<span className={`hud ${s.unitM}`}>D</span></span>
              <span className={`d num ${s.bigM}`}>{cd.h}<span className={`hud ${s.unitM}`}>H</span></span>
              <span className={`d num ${s.bigM} ${s.red}`}>{cd.m}<span className={`hud ${s.unitM}`}>M</span></span>
            </div>
            <span className={`hud ${s.untilM}`}>Until opening night, Wed Oct 21</span>
          </div>
          <div aria-hidden="true" className={s.dividerM} />
          <div className={s.liveBlockM}>
            <span className={`d ${s.liveNameM}`}>CultureLive™</span>
            <span className={`d8 ${s.liveDateM}`}>Coming soon</span>
          </div>
        </div>
      </div>

      <Link href={cur.href} className={`hud ${s.curLabel}`} style={{ borderLeftColor: cur.glow }}>
        {cur.day}
        <br />
        <span className={s.curName}>{cur.name}</span>
        <br />
        {cur.status}
      </Link>

      <div className={s.headlinerM}>
        <span className={`hud ${s.headHudM}`}>Headlining CultureLive™</span>
        <span className={`d ${s.headNameM}`}>{HEADLINER}</span>
        <span className={`d8 ${s.headPlusM}`}>Plus {SUPPORTING}</span>
        <span className={`hud ${s.pendingM}`}>[ARTIST NAMES PENDING CONFIRMATION]</span>
      </div>
    </div>
  );
}
