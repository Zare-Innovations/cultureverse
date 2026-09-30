import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { pageTitle, EXPO_STATUS } from '@/lib/site';
import { EVENT_HREF, WORLDS } from '@/lib/worlds';
import StayTappedIn from '@/components/StayTappedIn';
import { srcSet, LOGO_WIDTHS, STONE_WIDTHS } from '@/lib/img';
import s from './cultureverse.module.css';

export const metadata: Metadata = {
  title: pageTitle('The CultureVerse™'),
  description:
    'Welcome to CultureVerse™—the connected world of CultureBowl™, where music, community, creativity, competition, commerce, and culture come together in one shared experience.',
};

type Live = { name: string; mark: string; white?: boolean; mw: number; mh: number; mhM: number; shard: string; sw: number; sh: number; glow: string; when: string; status: string; statusM: string; href: string; rot: number };

const LIVE: Live[] = [
  { name: 'CultureLive™', mark: '/assets/logo-culturelive.png', mw: 1000, mh: 502, mhM: 48, shard: '/assets/stone-obsidian.webp', sw: 896, sh: 900, glow: '#FF6F00', when: 'Sat Oct 24 and Sun Oct 25', status: 'Ticketed', statusM: 'Ticketed', href: EVENT_HREF.live, rot: -10 },
  { name: "The Culture's Coldest™ ICON HONORS", mark: '/assets/logo-iconhonors.png', mw: 2000, mh: 350, mhM: 30, shard: '/assets/stone-ice.webp', sw: 625, sh: 900, glow: '#17A2BE', when: 'Wed Oct 21', status: 'Where the culture honors our stars', statusM: 'By invitation', href: EVENT_HREF.honors, rot: -6 },
  { name: 'The Culture EXCHNGE™', mark: '/assets/logo-exchnge.png', white: true, mw: 1000, mh: 271, mhM: 40, shard: '/assets/obj-orb.webp', sw: 1000, sh: 1005, glow: '#3971FF', when: 'Thu Oct 22', status: 'Request to attend', statusM: 'Request to attend', href: EVENT_HREF.exchnge, rot: 6 },
  { name: "The Culture's BIG GIVE™", mark: '/assets/logo-biggive.png', white: true, mw: 1000, mh: 477, mhM: 48, shard: '/assets/stone-green.webp', sw: 900, sh: 668, glow: '#D7F26A', when: 'Sat Oct 24', status: 'Free, community', statusM: 'Free', href: EVENT_HREF.give, rot: -12 },
  { name: 'CultureExpo™', mark: '/assets/logo-cultureexpo.png', mw: 1000, mh: 535, mhM: 48, shard: '/assets/stone-blue.webp', sw: 1000, sh: 696, glow: '#3971FF', when: 'Fri Oct 23 to Sun Oct 25', status: EXPO_STATUS, statusM: EXPO_STATUS, href: EVENT_HREF.expo, rot: 8 },
];
const MARK_H_D = [40, 60, 70, 70, 70];

const COMING = [
  { ...WORLDS.reunion, whenLine: 'Family over everything. Coming 2027', rot: 20 },
  { ...WORLDS.coming, whenLine: 'The culture’s biggest homecoming', rot: -18 },
  { ...WORLDS.games, whenLine: 'Coming 2027', rot: -24 },
];

const WELCOME =
  'Welcome to CultureVerse™—the connected world of CultureBowl™, where music, community, creativity, competition, commerce, and culture come together in one shared experience.';
const TAP = 'Get first access to CultureBowl™ announcements, artist lineups, ticket updates, exclusive experiences, merch drops, CultureVerse™ news, and so much more.';

export default function CultureversePage() {
  return (
    <>
      <section id="cultureverse" className={`page ${s.cv}`}>
        <Image className="bgimg" src="/assets/bg-cultureverse.webp" alt="" fill priority sizes="100vw" />
        <img aria-hidden="true" className={s.globe} src="/assets/obj-globe.webp" alt="" width={900} height={541} loading="lazy" />

        {/* Desktop */}
        <div className={`wrap ${s.wrap} only-d`}>
          <div className={s.head}>
            <h1 className={s.h}><img className={s.logo} src="/assets/logo-cultureverse.png" srcSet={srcSet("/assets/logo-cultureverse.png", LOGO_WIDTHS, 1400)} sizes="(min-width: 1024px) 1400px, 380px" alt="The CultureVerse" width={1400} height={711}  style={{ aspectRatio: '1400 / 711' }} /></h1>
            <div className={s.headCopy}>
              <p className={`d ${s.choose}`}>Choose your world</p>
              <p className={s.welcome}>{WELCOME}</p>
              <p className={`d8 ${s.lane}`}>The culture doesn’t just live in one lane, it thrives.</p>
            </div>
          </div>

          <div className={s.liveSec}>
            <p className={`d8 ${s.rule}`}><span>In Atlanta, October 21 to 25, 2026</span><span className="hud">First home. Built to travel.</span></p>
            <div className={s.liveGrid}>
              {LIVE.map((p, i) => (
                <Link key={p.href} className={s.world} href={p.href}>
                  <div className={`door lit ${s.doorBox}`} style={{ '--glow': p.glow } as CSSProperties}>
                    <img src={p.shard} srcSet={srcSet(p.shard, STONE_WIDTHS, p.sw)} sizes="(min-width: 1024px) 1400px, 180px" alt="" width={p.sw} height={p.sh} className={s.shard} style={{ transform: `rotate(${p.rot}deg)` }} loading="lazy" />
                  </div>
                  <img src={p.mark} srcSet={srcSet(p.mark, LOGO_WIDTHS, p.mw)} sizes="(min-width: 1024px) 1400px, 200px" alt={p.name} width={p.mw} height={p.mh} className={`${s.mark}${p.white ? ` ${s.markWhite}` : ''}`} style={{ height: MARK_H_D[i] }} loading="lazy" />
                  <span className={`hud ${s.when}`}>{p.when}<br /><span className={s.status}>{p.status}</span></span>
                  <span className={`hud ${s.cta}`}>Explore</span>
                </Link>
              ))}
            </div>
          </div>

          <div className={s.comingSec}>
            <p className={`d8 ${s.rule} ${s.ruleSoft}`}>Coming to the CultureVerse</p>
            <div className={s.comingGrid}>
              {COMING.map((w) => (
                <Link key={w.key} className={`${s.world} ${s.worldRow}`} href={w.route}>
                  <div className={`dormant ${s.dormantBox}`} style={{ '--glow': w.glow } as CSSProperties}>
                    <img src={w.shard} srcSet={srcSet(w.shard, STONE_WIDTHS, w.shardW)} sizes="(min-width: 1024px) 1400px, 130px" alt="" width={w.shardW} height={w.shardH} className={s.dormantImg} style={{ transform: `rotate(${w.rot}deg)` }} loading="lazy" />
                  </div>
                  <div className={s.comingCopy}>
                    <img src={w.mark} srcSet={srcSet(w.mark, LOGO_WIDTHS, w.markW)} sizes="(min-width: 1024px) 1400px, 200px" alt={w.name} width={w.markW} height={w.markH} className={s.comingMark} loading="lazy"  style={{ aspectRatio: `${w.markW} / ${w.markH}` }} />
                    <span className={`hud ${s.comingWhen}`}>{w.whenLine}</span>
                    <span className={`hud ${s.cta}`}>Explore</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className={s.tapRow}>
            <p className={`d ${s.tapTitle}`}>Stay tapped in</p>
            <p className={s.tapCopy}>{TAP}</p>
            <div className={s.grow} />
            <Link className="btn btn-red" href="/tap-in">Tap in</Link>
          </div>
        </div>

        {/* Mobile */}
        <div className={`wrap ${s.wrapM} only-m`}>
          <h1 className={s.hM}><img className={s.logoM} src="/assets/logo-cultureverse.png" srcSet={srcSet("/assets/logo-cultureverse.png", LOGO_WIDTHS, 1400)} sizes="(min-width: 1024px) 1400px, 220px" alt="The CultureVerse" width={1400} height={711}  style={{ aspectRatio: '1400 / 711' }} /></h1>
          <p className={`d ${s.chooseM}`}>Choose your world</p>
          <p className={s.welcomeM}>{WELCOME}</p>
          <p className={`d8 ${s.laneM}`}>The culture doesn’t just live in one lane, it thrives.</p>

          <p className={`d8 ${s.ruleM}`}>In Atlanta, October 21 to 25, 2026</p>
          <div className={s.listM}>
            {LIVE.map((p) => (
              <Link key={p.href} className={s.worldM} href={p.href}>
                <div className={`door lit ${s.doorBoxM}`} style={{ '--glow': p.glow } as CSSProperties}>
                  <img src={p.shard} srcSet={srcSet(p.shard, STONE_WIDTHS, p.sw)} sizes="(min-width: 1024px) 1400px, 84px" alt="" width={p.sw} height={p.sh} className={s.shardM} loading="lazy"  style={{ aspectRatio: `${p.sw} / ${p.sh}` }} />
                </div>
                <div className={s.copyM}>
                  <img src={p.mark} srcSet={srcSet(p.mark, LOGO_WIDTHS, p.mw)} sizes="(min-width: 1024px) 1400px, 170px" alt={p.name} width={p.mw} height={p.mh} className={`${s.markM}${p.white ? ` ${s.markWhite}` : ''}`} style={{ height: p.mhM }} loading="lazy" />
                  <span className={`hud ${s.whenM}`}>{p.when} <span className={s.status}>/ {p.statusM}</span></span>
                  <span className={`hud ${s.cta} ${s.ctaM}`}>Explore</span>
                </div>
              </Link>
            ))}
          </div>

          <p className={`d8 ${s.ruleM} ${s.ruleSoft}`}>Coming</p>
          <div className={s.listM}>
            {COMING.map((w) => (
              <Link key={w.key} className={s.worldM} href={w.route}>
                <div className={`dormant ${s.dormantBoxM}`} style={{ '--glow': w.glow } as CSSProperties}>
                  <img src={w.shard} srcSet={srcSet(w.shard, STONE_WIDTHS, w.shardW)} sizes="(min-width: 1024px) 1400px, 84px" alt="" width={w.shardW} height={w.shardH} className={s.dormantImgM} style={{ transform: `rotate(${w.rot}deg)` }} loading="lazy" />
                </div>
                <div className={s.copyM}>
                  <img src={w.mark} srcSet={srcSet(w.mark, LOGO_WIDTHS, w.markW)} sizes="(min-width: 1024px) 1400px, 170px" alt={w.name} width={w.markW} height={w.markH} className={s.comingMarkM} loading="lazy"  style={{ aspectRatio: `${w.markW} / ${w.markH}` }} />
                  <span className={`hud ${s.comingWhenM}`}>{w.whenLine}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className={s.tapM}>
            <p className={`d ${s.tapTitleM}`}>Stay tapped in</p>
            <p className={s.tapCopyM}>{TAP}</p>
            <Link className="btn btn-red" href="/tap-in">Tap in</Link>
          </div>
        </div>
      </section>
      <StayTappedIn />
    </>
  );
}
