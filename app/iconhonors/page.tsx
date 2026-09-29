import type { Metadata } from 'next';
import Image from 'next/image';
import { pageTitle } from '@/lib/site';
import HonorsForm from '@/components/forms/HonorsForm';
import EventJsonLd from '@/components/EventJsonLd';
import Reveal from '@/components/Reveal';
import { srcSet, HONORS_WIDTHS, OBJECT_WIDTHS } from '@/lib/img';
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

/** Intrinsic sizes of the two client posters, cut from the deck. */
const POSTER_T = [586, 764] as const;
const POSTER_N = [610, 766] as const;

const EVENING = ['Red carpet', 'Honors presentations', 'Performances', 'Cocktail reception', 'The After Glow'];

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
  const slots = mobile ? [0, 1] : [0, 1, 2, 3];
  return (
    <div className={mobile ? s.honoreesM : s.honorees}>
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
        <Image className="bgimg" src="/assets/bg-honors-keyart.webp" alt="" fill priority sizes="100vw" style={{ objectPosition: '50% 50%' }} />
        {/* The key art's composition rebuilt from the supplied renders at full resolution: the two
            chrome blades framing the lockup from the bottom corners, the ring sweeping across the
            top, and the coil and lattice as small accents. The art underneath is softened so its
            own baked-in arcs read as glow under these crisp edges. */}
        <img aria-hidden="true" className={`${s.obj} ${s.shellL}`} src="/assets/obj-shell.webp" srcSet={srcSet('/assets/obj-shell.webp', OBJECT_WIDTHS, 1400)} sizes="(min-width: 1024px) 640px, 300px" alt="" width={1400} height={1555} />
        <img aria-hidden="true" className={`${s.obj} ${s.shellR}`} src="/assets/obj-shell.webp" srcSet={srcSet('/assets/obj-shell.webp', OBJECT_WIDTHS, 1400)} sizes="(min-width: 1024px) 640px, 300px" alt="" width={1400} height={1555} />
        <img aria-hidden="true" className={`${s.obj} ${s.ring}`} src="/assets/obj-ring.webp" srcSet={srcSet('/assets/obj-ring.webp', OBJECT_WIDTHS, 1400)} sizes="(min-width: 1024px) 1400px, 900px" alt="" width={1400} height={1028} />
        <img aria-hidden="true" className={`${s.obj} ${s.coil}`} src="/assets/obj-coil.webp" srcSet={srcSet('/assets/obj-coil.webp', OBJECT_WIDTHS, 1400)} sizes="(min-width: 1024px) 220px, 90px" alt="" width={1400} height={1419} loading="lazy" />
        <img aria-hidden="true" className={`${s.obj} ${s.lattice}`} src="/assets/obj-lattice.webp" srcSet={srcSet('/assets/obj-lattice.webp', OBJECT_WIDTHS, 1400)} sizes="(min-width: 1024px) 240px, 100px" alt="" width={1400} height={1393} loading="lazy" />
      </div>
      <div aria-hidden="true" className={s.fade} />

      {/* Desktop */}
      <div className={`wrap ${s.wrap} only-d`}>
        <div className={s.top}>
          <div className={`hud ${s.gold}`}>Wed Oct 21, 2026</div>
          <div className={`hud ${s.topRight}`}>Flourish, Atlanta<br />Part of The Culture&rsquo;s Coldest&trade;</div>
        </div>
        <div className={s.center}>
          <h1 className={s.h}><img className={s.mark} src="/assets/logo-iconhonors.png" srcSet={srcSet("/assets/logo-iconhonors.png", HONORS_WIDTHS, 2000)} sizes="(min-width: 1024px) 1400px, 900px" alt="The Culture's Coldest ICON HONORS" width={2000} height={355}  style={{ aspectRatio: '2000 / 355' }} /></h1>
          <p className={`hud ${s.hosted}`}>{HOSTED}</p>
          <span className={`st st-invite ${s.invite}`}>Private, by invitation</span>
          <img className={s.mcf} src="/assets/logo-moving-culture-forward.png" alt="Moving Culture Forward" width={1000} height={54} />
        </div>

        <div className={s.inner}>
          {/* 1. The evening, explained */}
          <Reveal className={`${s.band} ${s.intro}`}>
            <div>
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
            </div>
            <figure className={s.hosts}>
              <Image className={s.hostsImg} src="/assets/poster-night.webp" alt="One unforgettable night: hosted by Marsai Martin, sounds by DJ D-NICE" width={POSTER_N[0]} height={POSTER_N[1]} sizes="(min-width: 1024px) 420px, 100vw" />
              <figcaption className={`hud ${s.hostsCap}`}>Hosted by Marsai Martin, sounds by DJ D-NICE</figcaption>
            </figure>
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
            <div className={s.feature}>
              <Image className={s.poster} src="/assets/poster-townsend.webp" alt="Taylor Townsend, Legacy in Motion Honoree" width={POSTER_T[0]} height={POSTER_T[1]} sizes="(min-width: 1024px) 460px, 100vw" />
              <div className={s.featureCopy}>
                <p className={`hud ${s.gold}`}>Wed Oct 21 &middot; #TCCICONS</p>
                <p className={`d ${s.featureHonor}`}>Legacy in Motion Honoree</p>
                <p className={`d ${s.featureName}`}>Taylor Townsend</p>
                <p className={s.featureBio}>Bio to follow with approval.</p>
                <p className={`hud ${s.muted}`}>Pending approval</p>
              </div>
            </div>
            <p className={`hud ${s.steel} ${s.classHead}`}>The class</p>
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
        <figure className={s.hostsM}>
          <Image className={s.hostsImg} src="/assets/poster-night.webp" alt="One unforgettable night: hosted by Marsai Martin, sounds by DJ D-NICE" width={POSTER_N[0]} height={POSTER_N[1]} sizes="100vw" />
          <figcaption className={`hud ${s.hostsCap}`}>Hosted by Marsai Martin, sounds by DJ D-NICE</figcaption>
        </figure>

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
        <div className={s.featureM}>
          <Image className={s.posterM} src="/assets/poster-townsend.webp" alt="Taylor Townsend, Legacy in Motion Honoree" width={POSTER_T[0]} height={POSTER_T[1]} sizes="100vw" />
          <p className={`hud ${s.gold}`}>Wed Oct 21 &middot; #TCCICONS</p>
          <p className={`d ${s.featureHonorM}`}>Legacy in Motion Honoree</p>
          <p className={`d ${s.featureNameM}`}>Taylor Townsend</p>
          <p className={`hud ${s.muted}`}>Pending approval</p>
        </div>
        <p className={`hud ${s.steel} ${s.classHeadM}`}>The class</p>
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
