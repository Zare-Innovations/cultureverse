import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { pageTitle } from '@/lib/site';
import EventJsonLd from '@/components/EventJsonLd';
import { srcSet, LOGO_WIDTHS } from '@/lib/img';
import s from './biggive.module.css';

export const metadata: Metadata = {
  title: pageTitle("The Culture's BIG GIVE™"),
  description:
    'In partnership with the City of Atlanta, Atlanta Housing Authority, and Goodr, Inc., The Culture’s BIG GIVE™ serves as a defining CultureBowl™ week experience—showcasing culture through meaningful community investment, collaboration and impact all in service of Moving Culture Forward™.',
};

const COPY =
  'In partnership with the City of Atlanta, Atlanta Housing Authority, and Goodr, Inc., The Culture’s BIG GIVE™ serves as a defining CultureBowl™ week experience—showcasing culture through meaningful community investment, collaboration and impact all in service of Moving Culture Forward™.';

const PARTNERS = [
  { href: 'https://www.atlantaga.gov/government/mayor-s-office', src: '/assets/partner-office-of-the-mayor.png', w: 640, h: 232, alt: 'City of Atlanta, Office of the Mayor' },
  { href: 'https://www.atlantahousing.org/', src: '/assets/partner-atlanta-housing.png', w: 640, h: 121, alt: 'Atlanta Housing' },
  { href: 'https://goodr.co/', src: '/assets/partner-goodr.png', w: 640, h: 138, alt: 'Goodr' },
];

/* Marker sweep under the headline's closing phrase. Decorative, so it is hidden from
   assistive tech; it takes its colour from .stroke and stretches to the phrase width.
   a-wipe draws it on left to right once the words have landed, and is already a no-op
   under prefers-reduced-motion. */
function Underline() {
  return (
    <svg className={`a-wipe ${s.stroke}`} style={{ '--d': '600ms' } as CSSProperties} viewBox="0 0 300 10" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M2 6.2 C 46 3.2 116 1.8 194 2.2 C 238 2.4 272 3.2 298 4.4 C 272 5.9 238 5.2 194 5 C 115 4.6 46 6.4 2.5 8.2 Z" fill="currentColor" />
    </svg>
  );
}

export default function BigGivePage() {
  return (
    <section id="give" className={`page ${s.give}`}>
      <EventJsonLd name="The Culture's BIG GIVE™" description={metadata.description as string} path="/biggive" startDate="2026-10-24" free />
      <Image className="bgimg" src="/assets/bg-biggive.webp" alt="" fill priority sizes="100vw" />
      {/* The lime shapes in the art run under the left column; a soft scrim keeps the eyebrow,
          the copy and the partner line off them. */}
      <div aria-hidden="true" className={s.shade} />

      {/* Desktop: one centred column, the way the brand's own key art frames BIG GIVE. The lime
          circles in the art sit in the corners and act as the framing, so nothing needs to fill a side. */}
      <div className={`wrap ${s.wrap} only-d`}>
        <div className={s.top}>
          <p className={`hud ${s.eyebrow}`}>Sat Oct 24, 2026 <span className={s.sep}>/</span> Free <span className={s.sep}>/</span> Community</p>
          <Link href="/cultureverse" className={`hud ${s.back}`}>Back to the CultureVerse</Link>
        </div>
        <div className={s.hero}>
          <h1 className={s.h}><img className={s.mark} src="/assets/logo-biggive.png" srcSet={srcSet("/assets/logo-biggive.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 440px" alt="The Culture's Big Give" width={1000} height={477}  style={{ aspectRatio: '1000 / 477' }} /></h1>
          <p className={`d ${s.title}`}>When all of us give. <span className={s.grow}>All of us grow<Underline /></span></p>
          <p className={s.copy}>{COPY}</p>
          <div className={s.cta}>
            <Link className="btn btn-lime" href="/tap-in">Notify me</Link>
            <p className={s.note}>Details to be announced. Join the list to hear first.</p>
          </div>
        </div>
        <div className={s.partnersBlock}>
          <p className={`hud ${s.partnersHead}`}>In partnership with</p>
          <div className={s.partners}>
            {PARTNERS.map((p) => (
              <a key={p.href} className={s.plogo} href={p.href}>
                <img src={p.src} alt={p.alt} width={p.w} height={p.h} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className={`wrap ${s.wrapM} only-m`}>
        <p className={`hud ${s.eyebrowM}`}>Sat Oct 24, 2026. Free.</p>
        <h1 className={s.hM}><img className={s.markM} src="/assets/logo-biggive.png" srcSet={srcSet("/assets/logo-biggive.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 280px" alt="The Culture's Big Give" width={1000} height={477}  style={{ aspectRatio: '1000 / 477' }} /></h1>
        <p className={`d ${s.titleM}`}>When all of us give. <span className={s.grow}>All of us grow<Underline /></span></p>
        <p className={s.copyM}>{COPY}</p>
        <div className={s.ctaM}>
          <Link className="btn btn-lime" href="/tap-in">Notify me</Link>
          <p className={s.noteM}>Details to be announced. Join the list to hear first.</p>
        </div>
        <p className={`hud ${s.partnersHeadM}`}>In partnership with</p>
        <div className={s.partnersM}>
          {PARTNERS.map((p) => (
            <div key={p.href} className={s.plogoM}>
              <img src={p.src} alt={p.alt} width={p.w} height={p.h} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
