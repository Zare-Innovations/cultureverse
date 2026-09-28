import type { Metadata } from 'next';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { pageTitle } from '@/lib/site';
import HonorsForm from '@/components/forms/HonorsForm';
import EventJsonLd from '@/components/EventJsonLd';
import Reveal from '@/components/Reveal';
import { srcSet, LOGO_WIDTHS, STONE_WIDTHS, HONORS_WIDTHS } from '@/lib/img';
import s from './iconhonors.module.css';

export const metadata: Metadata = {
  title: pageTitle("The Culture's Coldest™ ICON HONORS"),
  description:
    'An iconic evening honoring achievement across business, the arts, creator economy, philanthropy, sports, entertainment, education, public policy, tech, and global impact. Wed Oct 21, 2026, Flourish, Atlanta. Private, by invitation.',
};

const HOSTED = 'Hosted by Marsai Martin with The Culture’s Coldest™ Sounds by DJ D-NICE';

const ABOUT =
  'The Culture’s Coldest™ ICON HONORS is an iconic evening honoring achievement across business, the arts, creator economy, philanthropy, sports, entertainment, education, public policy, tech, and global impact.';

const PILLARS = ['Achievement', 'Excellence', 'Impact'];

const EVENING = ['Red carpet', 'Honors presentations', 'Performances', 'Cocktail reception', 'The After Glow'];

/** One confirmed honoree; the rest of the class lands with headshots and bios once approved. */
const HONOREES = [
  {
    name: '[Taylor Townsend]',
    honor: 'Legacy in Motion Honoree',
    bio: 'Bio to follow with approval.',
    note: 'Pending approval',
  },
] as const;

const FACTS = [
  ['Date', 'Wed Oct 21, 2026'],
  ['Venue', 'Flourish, Atlanta'],
  ['Guests', '750+'],
  ['Access', 'By invitation'],
] as const;

const PARTNERS = {
  honors: [
    ['/assets/partner-amazon.png', 640, 215, 'Amazon'],
    ['/assets/partner-visa.png', 640, 207, 'Visa'],
    ['/assets/partner-bentley-atlanta.png', 454, 242, 'Bentley Atlanta'],
  ],
  participants: [
    ['/assets/partner-allstate.png', 640, 135, 'Allstate'],
    ['/assets/partner-mcdonald-s.png', 640, 80, "McDonald's"],
    ['/assets/partner-fifth-third.png', 640, 116, 'Fifth Third'],
    ['/assets/partner-comerica.png', 640, 152, 'Comerica Bank'],
  ],
  media: [
    ['/assets/partner-black-enterprise.png', 640, 158, 'Black Enterprise'],
    ['/assets/partner-iheartmedia.png', 640, 201, 'iHeartMedia'],
    ['/assets/partner-bin.png', 334, 312, 'Black Information Network'],
  ],
} as const;

function Logos({ list, cols, mobile }: { list: readonly (readonly [string, number, number, string])[]; cols: number; mobile?: boolean }) {
  return (
    <div className={mobile ? s.logosM : s.logos} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {list.map(([src, w, h, alt]) => (
        <div key={src} className={mobile ? s.plogoM : s.plogo}>
          <img src={src} alt={alt} width={w} height={h} />
        </div>
      ))}
    </div>
  );
}

/** The honoree grid: one approved name and three slots waiting on the class. */
function Honorees({ mobile }: { mobile?: boolean }) {
  const slots = mobile ? [0, 1] : [0, 1, 2];
  return (
    <div className={mobile ? s.honoreesM : s.honorees}>
      {HONOREES.map((h) => (
        <article key={h.name} className={s.honoree}>
          <div className={s.portrait}><span className={`hud ${s.portraitText}`}>Headshot<br />pending</span></div>
          <p className={`serif ${s.name}`}>{h.name}</p>
          <p className={`hud ${s.honor}`}>{h.honor}</p>
          <p className={s.bio}>{h.bio}</p>
          <p className={`hud ${s.muted}`}>{h.note}</p>
        </article>
      ))}
      {slots.map((i) => (
        <article key={i} aria-hidden="true" className={s.honoree}>
          <div className={`${s.portrait} ${s.portal}`}><span className={`hud ${s.portalText}`}>To be<br />announced</span></div>
          <p className={`serif ${s.name} ${s.nameTba}`}>To be announced</p>
          <p className={`hud ${s.honor}`}>Honoree</p>
          <p className={s.bio}>Bio to follow.</p>
        </article>
      ))}
    </div>
  );
}

export default function IconHonorsPage() {
  return (
    <section id="honors" className={`page ${s.honors}`}>
      <EventJsonLd name="The Culture's Coldest™ ICON HONORS" description={metadata.description as string} path="/iconhonors" startDate="2026-10-21" venue="Flourish, Atlanta" />
      <div className={s.bgBox}>
        <Image className="bgimg" src="/assets/bg-honors.webp" alt="" fill priority sizes="100vw" style={{ objectPosition: '50% 0%' }} />
      </div>
      <div aria-hidden="true" className={s.fade} />
      {/* Silver sweeps layered behind the lockup: pure CSS, no asset and no request. */}
      <div aria-hidden="true" className={s.silver} />

      {/* Desktop */}
      <div className={`wrap ${s.wrap} only-d`}>
        <div className={s.top}>
          <div className={`hud ${s.gold}`}>Wed Oct 21, 2026</div>
          <div className={`hud ${s.topRight}`}>Flourish, Atlanta<br />Part of The Culture&rsquo;s Coldest&trade;</div>
        </div>
        <div className={s.center}>
          {/* Decorative objects flanking the lockup. Purely ornamental, so they are hidden from
              assistive tech, lazy, and sit behind the type. a-in is a no-op under reduced motion. */}
          <img aria-hidden="true" className={`a-in ${s.orb} ${s.orbLattice}`} style={{ '--d': '900ms' } as CSSProperties} src="/assets/obj-lattice.webp" srcSet={srcSet("/assets/obj-lattice.webp", STONE_WIDTHS, 700)} sizes="(min-width: 1024px) 200px, 110px" alt="" width={700} height={697} loading="lazy" />
          <img aria-hidden="true" className={`a-in ${s.orb} ${s.orbRing}`} style={{ '--d': '1000ms' } as CSSProperties} src="/assets/obj-ring.webp" srcSet={srcSet("/assets/obj-ring.webp", STONE_WIDTHS, 700)} sizes="(min-width: 1024px) 170px, 100px" alt="" width={700} height={514} loading="lazy" />
          <img aria-hidden="true" className={`a-in ${s.orb} ${s.orbCoil}`} style={{ '--d': '1100ms' } as CSSProperties} src="/assets/obj-coil.webp" srcSet={srcSet("/assets/obj-coil.webp", STONE_WIDTHS, 691)} sizes="(min-width: 1024px) 140px, 90px" alt="" width={691} height={700} loading="lazy" />
          <img aria-hidden="true" className={`a-in ${s.orb} ${s.orbShell}`} style={{ '--d': '1200ms' } as CSSProperties} src="/assets/obj-shell.webp" srcSet={srcSet("/assets/obj-shell.webp", STONE_WIDTHS, 631)} sizes="(min-width: 1024px) 125px, 80px" alt="" width={631} height={700} loading="lazy" />
          <h1 className={s.h}><img className={s.mark} src="/assets/logo-iconhonors.png" srcSet={srcSet("/assets/logo-iconhonors.png", HONORS_WIDTHS, 2000)} sizes="(min-width: 1024px) 1400px, 900px" alt="The Culture's Coldest ICON HONORS" width={2000} height={355}  style={{ aspectRatio: '2000 / 355' }} /></h1>
          <p className={`hud ${s.hosted}`}>{HOSTED}</p>
          <span className={`st st-invite ${s.invite}`}>Private, by invitation</span>
          <img className={s.mcf} src="/assets/logo-moving-culture-forward.png" alt="Moving Culture Forward" width={1000} height={54} />
        </div>

        <div className={s.inner}>
          {/* 1. The evening, explained */}
          <Reveal className={s.band}>
            <p className={`hud ${s.bandHead} ${s.steel}`}>An iconic evening</p>
            <p className={`serif ${s.about}`}>{ABOUT}</p>
            <ul className={s.pillars}>
              {PILLARS.map((p) => (
                <li key={p} className={`d ${s.pillar}`}>{p}</li>
              ))}
            </ul>
            <dl className={s.facts}>
              {FACTS.map(([k, v]) => (
                <div key={k}><dt className={`hud ${s.steel}`}>{k}</dt><dd className={`serif ${s.factV}`}>{v}</dd></div>
              ))}
            </dl>
          </Reveal>

          <Reveal className={s.frameBox} delay={80}>
            <div aria-hidden="true" className={s.frame} />
            <Image className={s.render} src="/assets/render-honors-gala.webp" alt="Rendering of the ICON HONORS gala room, tables facing the stage" width={1800} height={930} sizes="(min-width: 1024px) 1312px, 660px" />
          </Reveal>

          {/* 2. The evening, hour by hour */}
          <Reveal className={s.band}>
            <p className={`serif ${s.bandTitle}`}>The evening</p>
            <ol className={s.evening}>
              {EVENING.map((t, i) => (
                <li key={t} className={s.item}>
                  <span className={`hud ${s.itemNum} ${s.steel}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`serif ${s.itemText}`}>{t}</span>
                  {i === EVENING.length - 1 && <span className={`hud ${s.after}`}>after-party</span>}
                </li>
              ))}
            </ol>
          </Reveal>

          {/* 3. The class */}
          <Reveal className={s.band}>
            <h2 className={`serif ${s.bandTitle}`}>Celebrating the Culture&rsquo;s Coldest&trade;</h2>
            <Honorees />
            <p className={`serif ${s.more}`}>more to be announced</p>
          </Reveal>

          {/* 4. Partners */}
          <Reveal className={s.band}>
            <div className={s.partners}>
              <div><p className={`hud ${s.steel} ${s.partnersHead}`}>ICON HONORS&trade; partners</p><Logos list={PARTNERS.honors} cols={3} /></div>
              <div><p className={`hud ${s.steel} ${s.partnersHead}`}>Participants</p><Logos list={PARTNERS.participants} cols={4} /></div>
              <div><p className={`hud ${s.steel} ${s.partnersHead}`}>Media partners</p><Logos list={PARTNERS.media} cols={3} /></div>
            </div>
            <p className={`hud ${s.partial}`}>*Partial listing as confirmed</p>
          </Reveal>

          <HonorsForm variant="d" />
        </div>
      </div>

      {/* Mobile */}
      <div className={`wrap ${s.wrapM} only-m`}>
        <div className={s.topM}>
          <span className={`hud ${s.gold}`}>Wed Oct 21, 2026</span>
          <span className="hud">Flourish, Atlanta</span>
        </div>
          {/* One object on mobile: measured, the column has one clear region, right of the
              invite chip between the hosted line and the frame. */}
          <img aria-hidden="true" className={`a-in ${s.orb} ${s.orbRingM}`} style={{ '--d': '950ms' } as CSSProperties} src="/assets/obj-ring.webp" srcSet={srcSet("/assets/obj-ring.webp", STONE_WIDTHS, 700)} sizes="90px" alt="" width={700} height={514} loading="lazy" />
        <h1 className={s.hM}><img className={s.markM} src="/assets/logo-iconhonors.png" srcSet={srcSet("/assets/logo-iconhonors.png", HONORS_WIDTHS, 2000)} sizes="(min-width: 1024px) 1400px, 342px" alt="The Culture's Coldest ICON HONORS" width={2000} height={355}  style={{ aspectRatio: '2000 / 355' }} /></h1>
        <p className={`hud ${s.hostedM}`}>{HOSTED}</p>
        <div className={s.inviteM}><span className="st st-invite">Private, by invitation</span></div>
        <img className={s.mcfM} src="/assets/logo-moving-culture-forward.png" alt="Moving Culture Forward" width={1000} height={54} />

        <p className={`serif ${s.aboutM}`}>{ABOUT}</p>
        <ul className={s.pillarsM}>
          {PILLARS.map((p) => (
            <li key={p} className={`d ${s.pillarM}`}>{p}</li>
          ))}
        </ul>
        <dl className={s.factsM}>
          {FACTS.map(([k, v]) => (
            <div key={k}><dt className={`hud ${s.steel}`}>{k}</dt><dd className={`serif ${s.factVM}`}>{v}</dd></div>
          ))}
        </dl>

        <div className={s.frameBoxM}>
          <div aria-hidden="true" className={s.frameM} />
          <Image className={s.renderM} src="/assets/render-honors-gala.webp" alt="Rendering of the ICON HONORS gala room" width={1800} height={930} sizes="100vw" />
        </div>

        <p className={`serif ${s.bandTitleM}`}>The evening</p>
        <ol className={s.eveningM}>
          {EVENING.map((t, i) => (
            <li key={t} className={s.itemM}>
              <span className={`hud ${s.itemNum} ${s.steel}`}>{String(i + 1).padStart(2, '0')}</span>
              <span className={`serif ${s.itemTextM}`}>{t}</span>
            </li>
          ))}
        </ol>

        <h2 className={`serif ${s.bandTitleM}`}>Celebrating the Culture&rsquo;s Coldest&trade;</h2>
        <Honorees mobile />
        <p className={`serif ${s.moreM}`}>more to be announced</p>

        <p className={`hud ${s.steel} ${s.partnersHeadM}`}>ICON HONORS&trade; partners</p>
        <Logos list={PARTNERS.honors} cols={3} mobile />
        <p className={`hud ${s.steel} ${s.partnersHeadM2}`}>Participants</p>
        <Logos list={PARTNERS.participants} cols={4} mobile />
        <p className={`hud ${s.steel} ${s.partnersHeadM2}`}>Media partners</p>
        <Logos list={PARTNERS.media} cols={3} mobile />
        <p className={`hud ${s.partialM}`}>*Partial listing as confirmed</p>
        <HonorsForm variant="m" />
      </div>
    </section>
  );
}
