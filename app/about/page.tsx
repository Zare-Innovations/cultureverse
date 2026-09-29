import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CONTACT_MAILTO, pageTitle } from '@/lib/site';
import BgVideo from '@/components/BgVideo';
import s from './about.module.css';

export const metadata: Metadata = {
  title: pageTitle('About'),
  description: 'CultureBowl™ is a multi-day experience created with the belief that culture is meant to be shared, celebrated, and honored.',
};

export default function AboutPage() {
  return (
    <section id="about" className={`page ${s.about}`}>
      {/* The city band wraps the eyebrow, the mark and the lede, so it always ends just under the
          copy however tall the lede runs, and the body below starts on the navy. */}
      <div className={s.hero}>
        <div className={s.band}>
          <Image className="bgimg" src="/assets/bg-about.webp" alt="" fill priority sizes="100vw" style={{ opacity: 0.9, objectPosition: '50% 30%' }} />
          {/* Aerial pass over Atlanta, the city the story below is built in; the still above stays as the first paint and the fallback. */}
          <BgVideo className={`bgimg ${s.video}`} desktop="/assets/video/atlanta-aerial-1280.mp4" mobile="/assets/video/atlanta-aerial-720.mp4" style={{ objectPosition: '50% 30%' }} />
          <div aria-hidden="true" className={s.shade} />
        </div>
        <div className={`wrap ${s.heroWrap}`}>
          <p className={`hud ${s.eyebrow}`}>About CultureBowl™</p>
          <div className={s.intro}>
            <h1 className={s.h}>
              <img className={s.logo} src="/assets/logo-culturebowl-white.svg" alt="CultureBowl" width={2115} height={1023} />
            </h1>
            <p className={`d ${s.lede}`}>CultureBowl™ is a multi-day experience created with the belief that culture is meant to be shared, celebrated, and honored.</p>
          </div>
        </div>
      </div>

      <div className={`wrap ${s.wrap}`}>
        {/* Desktop grid */}
        <div className={`${s.grid} only-d`}>
          <div className={s.col}>
            <img className={s.mcf} src="/assets/logo-moving-culture-forward.png" alt="Moving Culture Forward" width={1000} height={54} />
            <p className={s.body}>
              CultureBowl™ is a global platform built to celebrate what has shaped us and champion what’s next. Bringing together music, community,
              creativity, commerce, and live experience, it offers one shared space to connect, grow, and keep Moving Culture Forward™.
            </p>
            <div className={s.iheartRow}>
              <img className={s.iheart} src="/assets/logo-powered-by-iheart.png" alt="Powered by iHeartMedia" width={1000} height={61} />
            </div>
            <div className={s.btns}>
              <Link className="btn btn-red btn-sm" href="/cultureverse">Explore the CultureVerse</Link>
              <a className="btn btn-line btn-sm" href={CONTACT_MAILTO}>Contact</a>
            </div>
          </div>
          <div className={s.photos}>
            <Image className={s.photo1} src="/assets/photo-about-1.webp" alt="Guests together at an event" width={1800} height={1200} sizes="(min-width: 1024px) 608px, 100vw" />
            <Image className={s.photo2} src="/assets/photo-about-skyline.webp" alt="The downtown Atlanta skyline at sunset" width={565} height={353} sizes="(min-width: 1024px) 296px, 50vw" />
            <div className={s.redbox}>
              <span className={`d ${s.builtD}`}>First Home: Atlanta</span>
              <span className={s.builtCopy}>
                From music and entertainment, to business and community, Atlanta’s influence is global—making it the perfect first home.
              </span>
            </div>
          </div>
        </div>

        {/* Mobile stack */}
        <div className={`${s.mobile} only-m`}>
          <img className={s.mcfM} src="/assets/logo-moving-culture-forward.png" alt="Moving Culture Forward" width={1000} height={54} />
          <p className={s.bodyM}>
            CultureBowl™ is a global platform built to celebrate what has shaped us and champion what’s next. Bringing together music, community,
            creativity, commerce, and live experience, it offers one shared space to connect, grow, and keep Moving Culture Forward™.
          </p>
          <p className={`d ${s.builtM}`}>First Home: Atlanta</p>
          <p className={s.builtCopyM}>
            From music and entertainment, to business and community, Atlanta’s influence is global—making it the perfect first home.
          </p>
          <img className={s.iheartM} src="/assets/logo-powered-by-iheart.png" alt="Powered by iHeartMedia" width={1000} height={61} />
          <Image className={s.photoM} src="/assets/photo-about-1.webp" alt="Guests together at an event" width={1800} height={1200} sizes="100vw" />
          <div className={s.btnsM}>
            <Link className="btn btn-red btn-sm" href="/cultureverse">Explore the CultureVerse</Link>
            <a className="btn btn-line btn-sm" href={CONTACT_MAILTO}>Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
}
