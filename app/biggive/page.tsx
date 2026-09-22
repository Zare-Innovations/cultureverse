import type { Metadata } from 'next';
import Image from 'next/image';
import { pageTitle } from '@/lib/site';
import BigGiveForm from '@/components/forms/BigGiveForm';
import EventJsonLd from '@/components/EventJsonLd';
import { srcSet, LOGO_WIDTHS, STONE_WIDTHS } from '@/lib/img';
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
   assistive tech; it takes its colour from .stroke and stretches to the phrase width. */
function Underline() {
  return (
    <svg className={s.stroke} viewBox="0 0 300 10" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M2 6.2 C 46 3.2 116 1.8 194 2.2 C 238 2.4 272 3.2 298 4.4 C 272 5.9 238 5.2 194 5 C 115 4.6 46 6.4 2.5 8.2 Z" fill="currentColor" />
    </svg>
  );
}

export default function BigGivePage() {
  return (
    <section id="give" className={`page ${s.give}`}>
      <EventJsonLd name="The Culture's BIG GIVE™" description={metadata.description as string} path="/biggive" startDate="2026-10-24" free />
      <Image className="bgimg" src="/assets/bg-biggive.webp" alt="" fill priority sizes="100vw" />

      {/* Desktop */}
      <div className={`wrap ${s.wrap} only-d`}>
        <div className={s.grid}>
          <div className={s.left}>
            <p className={`hud ${s.eyebrow}`}>Sat Oct 24, 2026. Free. Community.</p>
            <h1 className={s.h}><img className={s.mark} src="/assets/logo-biggive.png" srcSet={srcSet("/assets/logo-biggive.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 440px" alt="The Culture's Big Give" width={1000} height={477}  style={{ aspectRatio: '1000 / 477' }} /></h1>
            <p className={`d ${s.title}`}>When all of us give.<br /><span className={s.grow}>All of us grow<Underline /></span></p>
            <p className={s.copy}>{COPY}</p>
            <ol className={s.steps}>
              <li className={s.step}><span className={`d ${s.num}`}>1</span><span className={s.stepText}>Sign up here.</span></li>
              <li className={s.step}><span className={`d ${s.num}`}>2</span><span className={s.stepText}>Get your site and shift by email once they are set.</span></li>
              <li className={s.step}><span className={`d ${s.num}`}>3</span><span className={s.stepText}>Show up Saturday, October 24.</span></li>
            </ol>
            <div>
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
          <div className={s.right}>
            <BigGiveForm variant="d" />
            <Image className={s.keyart} src="/assets/keyart-biggive-billboard.webp" alt="The Culture's Big Give key art" width={1600} height={823} sizes="(min-width: 1024px) 1400px, 390px" />
            <img aria-hidden="true" className={s.stone} src="/assets/stone-green.webp" srcSet={srcSet("/assets/stone-green.webp", STONE_WIDTHS, 900)} sizes="(min-width: 1024px) 1400px, 210px" alt="" width={900} height={668} loading="lazy"  style={{ aspectRatio: '900 / 668' }} />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className={`wrap ${s.wrapM} only-m`}>
        <img aria-hidden="true" className={s.stoneM} src="/assets/stone-green.webp" srcSet={srcSet("/assets/stone-green.webp", STONE_WIDTHS, 900)} sizes="(min-width: 1024px) 1400px, 150px" alt="" width={900} height={668}  style={{ aspectRatio: '900 / 668' }} />
        <p className={`hud ${s.eyebrowM}`}>Sat Oct 24, 2026. Free.</p>
        <h1 className={s.hM}><img className={s.markM} src="/assets/logo-biggive.png" srcSet={srcSet("/assets/logo-biggive.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 280px" alt="The Culture's Big Give" width={1000} height={477}  style={{ aspectRatio: '1000 / 477' }} /></h1>
        <p className={`d ${s.titleM}`}>When all of us give. <span className={s.grow}>All of us grow<Underline /></span></p>
        <p className={s.copyM}>{COPY}</p>
        <ol className={s.stepsM}>
          <li className={s.stepM}><span className={`d ${s.numM}`}>1</span><span className={s.stepTextM}>Sign up here.</span></li>
          <li className={s.stepM}><span className={`d ${s.numM}`}>2</span><span className={s.stepTextM}>Get your site and shift by email.</span></li>
          <li className={s.stepM}><span className={`d ${s.numM}`}>3</span><span className={s.stepTextM}>Show up Saturday, October 24.</span></li>
        </ol>
        <p className={`hud ${s.partnersHeadM}`}>In partnership with</p>
        <div className={s.partnersM}>
          {PARTNERS.map((p) => (
            <div key={p.href} className={s.plogoM}>
              <img src={p.src} alt={p.alt} width={p.w} height={p.h} />
            </div>
          ))}
        </div>
        <BigGiveForm variant="m" />
      </div>
    </section>
  );
}
