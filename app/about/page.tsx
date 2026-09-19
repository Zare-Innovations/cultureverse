import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CONTACT_MAILTO, pageTitle } from '@/lib/site';
import s from './about.module.css';

export const metadata: Metadata = {
  title: pageTitle('About'),
  description: 'CultureBowl™ is a multi-day experience created with the belief that culture is meant to be shared, celebrated, and honored.',
};

export default function AboutPage() {
  return (
    <section id="about" className={`page ${s.about}`}>
      <div className={s.band}>
        <Image className="bgimg" src="/assets/bg-about.webp" alt="" fill priority sizes="100vw" style={{ opacity: 0.9, objectPosition: '50% 30%' }} />
        <div aria-hidden="true" className={s.shade} />
      </div>

      <div className={`wrap ${s.wrap}`}>
        <p className={`hud ${s.eyebrow}`}>About CultureBowl™</p>
        <div className={s.intro}>
          <h1 className={s.h}>
            <img className={s.logo} src="/assets/logo-culturebowl-white.svg" alt="CultureBowl" width={2115} height={1023} />
          </h1>
          <p className={`d ${s.lede}`}>CultureBowl™ is a multi-day experience created with the belief that culture is meant to be shared, celebrated, and honored.</p>
          <img className={s.mcf} src="/assets/logo-moving-culture-forward.png" alt="Moving Culture Forward" width={1000} height={54} />
        </div>

        {/* Desktop grid */}
        <div className={`${s.grid} only-d`}>
          <div className={s.col}>
            <p className={s.body}>
              CultureBowl™ is a global platform built to celebrate what has shaped us and champion what’s next. Bringing together music, community,
              creativity, commerce, and live experience, it offers one shared space to connect, grow, and keep Moving Culture Forward™.
            </p>
            <div className={s.iheartRow}>
              <img className={s.iheart} src="/assets/logo-powered-by-iheart.png" alt="Powered by iHeartMedia" width={1000} height={61} />
            </div>
            <div className={s.btns}>
              <Link className="btn btn-red" href="/cultureverse">Explore the Cultureverse</Link>
              <a className="btn btn-line" href={CONTACT_MAILTO}>Contact</a>
            </div>
          </div>
          <div className={s.photos}>
            <Image className={s.photo1} src="/assets/photo-about-1.webp" alt="Guests together at an event" width={1800} height={1200} sizes="(min-width: 1024px) 608px, 100vw" />
            <Image className={s.photo2} src="/assets/photo-about-2.webp" alt="Portrait at an event" width={1012} height={1800} sizes="(min-width: 1024px) 296px, 50vw" />
            <div className={s.redbox}>
              <span className={`d ${s.builtD}`}>Built in Atlanta</span>
              <span className={s.builtCopy}>
                Atlanta has always been a city of culture. From music and entertainment, to business and community, its influence is global—making it the
                perfect first home.
              </span>
            </div>
          </div>
        </div>

        {/* Mobile stack */}
        <div className={`${s.mobile} only-m`}>
          <p className={s.bodyM}>
            CultureBowl™ is a global platform built to celebrate what has shaped us and champion what’s next. Bringing together music, community,
            creativity, commerce, and live experience, it offers one shared space to connect, grow, and keep Moving Culture Forward™.
          </p>
          <p className={`d ${s.builtM}`}>Built in Atlanta</p>
          <p className={s.builtCopyM}>
            Atlanta has always been a city of culture. From music and entertainment, to business and community, its influence is global—making it the
            perfect first home.
          </p>
          <img className={s.iheartM} src="/assets/logo-powered-by-iheart.png" alt="Powered by iHeartMedia" width={1000} height={61} />
          <Image className={s.photoM} src="/assets/photo-about-1.webp" alt="Guests together at an event" width={1800} height={1200} sizes="100vw" />
          <div className={s.btnsM}>
            <Link className="btn btn-red" href="/cultureverse">Explore the Cultureverse</Link>
            <a className="btn btn-line" href={CONTACT_MAILTO}>Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
}
