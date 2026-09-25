import Link from 'next/link';
import Image from 'next/image';
import { CONTACT_EMAIL, CONTACT_MAILTO } from '@/lib/site';
import ShopLink from '@/components/ShopLink';
import TicketLink from './TicketLink';
import s from './Footer.module.css';

const CV_LINKS = [
  ['/iconhonors', "The Culture's Coldest™ ICON HONORS"],
  ['/exchnge', 'The Culture EXCHNGE™'],
  ['/cultureexpo', 'CultureExpo™'],
  ['/biggive', "The Culture's BIG GIVE™"],
  ['/culturelive', 'CultureLive™'],
] as const;

const COMING_LINKS = [
  ['/cultureunion', 'CultuReunion™'],
  ['/culturecoming', 'CultureComing™'],
  ['/culturegames', 'CultureGames™'],
  ['/cultureverse', 'About the CultureVerse™'],
] as const;

function Legal({ className }: { className?: string }) {
  return (
    <>
      <a className={`${s.fl} ${s.small}`} href="#">Instagram</a>
      <a className={`${s.fl} ${s.small}`} href="#">Twitter</a>
      <a className={`${s.fl} ${s.small}`} href="#">Facebook</a>
      <a className={`${s.fl} ${s.small}`} href="#">Privacy</a>
      <a className={`${s.fl} ${s.small}`} href="#">Terms</a>
      <span className={className}>© 2026 [LEGAL ENTITY]. CultureBowl, Cultureverse and all sub-brand names are trademarks.</span>
    </>
  );
}

function ContactLine() {
  return (
    <p className={s.contact}>
      Contact us with any questions at{' '}
      <a href={CONTACT_MAILTO} className={s.mail}>
        {CONTACT_EMAIL}
      </a>
    </p>
  );
}

export default function Footer() {
  return (
    <footer className={s.foot}>
      <div className={s.red}>
        <Image className="bgimg" src="/assets/bg-red-fragments.webp" alt="" fill sizes="100vw" style={{ objectPosition: '50% 30%', opacity: 0.5 }} />
      </div>
      <div className={`wrap ${s.wrap}`}>
        <div className={s.top}>
          <div className={s.head}>
            <p className={`d ${s.calling}`}>
              The Culture
              <br />
              Is Calling
            </p>
            <p className={`hud ${s.tag}`}>A worldwide celebration of culture</p>
          </div>
          <div className={s.ctas}>
            <TicketLink className="btn btn-white">Get tickets</TicketLink>
            <Link className="btn btn-navy" href="/tap-in">
              Tap in
            </Link>
          </div>
        </div>

        {/* Desktop columns */}
        <div className={`${s.grid} only-d`}>
          <div className={s.col1}>
            <img className={`cb-logo-sm ${s.logo}`} src="/assets/logo-culturebowl-white.svg" alt="CultureBowl" width={2115} height={1023} />
            <img className={s.iheart} src="/assets/logo-powered-by-iheart.png" alt="Powered by iHeartMedia" width={1000} height={61} />
            <ContactLine />
          </div>
          <nav aria-label="The Cultureverse" className={s.navcol}>
            <p className={`hud ${s.navhead}`}>The Cultureverse</p>
            {CV_LINKS.map(([href, label]) => (
              <Link key={href} className={s.fl} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Coming" className={s.navcol}>
            <p className={`hud ${s.navhead}`}>Coming</p>
            {COMING_LINKS.map(([href, label]) => (
              <Link key={href} className={s.fl} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <nav aria-label="CultureBowl" className={s.navcol}>
            <p className={`hud ${s.navhead}`}>CultureBowl</p>
            <Link className={s.fl} href="/about">About</Link>
            <ShopLink className={s.fl}>Shop</ShopLink>
          </nav>
        </div>
        <div className={`${s.bar} only-d`}>
          <img className={s.mcf} src="/assets/logo-moving-culture-forward.png" alt="Moving Culture Forward" width={1000} height={54} />
          <div className={s.legal}>
            <Legal />
          </div>
        </div>

        {/* Mobile stack */}
        <div className={`${s.mobile} only-m`}>
          <div className={s.logos}>
            <img className={`cb-logo-sm ${s.logoM}`} src="/assets/logo-culturebowl-white.svg" alt="CultureBowl" width={2115} height={1023} />
            <img className={s.iheartM} src="/assets/logo-powered-by-iheart.png" alt="Powered by iHeartMedia" width={1000} height={61} />
          </div>
          <div className={s.gridM}>
            <nav aria-label="The Cultureverse">
              <p className={`hud ${s.navheadM}`}>The Cultureverse</p>
              {CV_LINKS.map(([href, label]) => (
                <Link key={href} className={s.flM} href={href}>
                  {label}
                </Link>
              ))}
              <Link className={s.flM} href="/cultureverse">
                About the CultureVerse™
              </Link>
            </nav>
            <nav aria-label="CultureBowl">
              <p className={`hud ${s.navheadM}`}>CultureBowl</p>
              <Link className={s.flM} href="/about">About</Link>
              <ShopLink className={s.flM}>Shop</ShopLink>
            </nav>
          </div>
          <ContactLine />
          <img className={s.mcfM} src="/assets/logo-moving-culture-forward.png" alt="Moving Culture Forward" width={1000} height={54} />
          <div className={s.barM}>
            <a className={s.flM} href="#">Instagram</a>
            <a className={s.flM} href="#">Twitter</a>
            <a className={s.flM} href="#">Facebook</a>
            <a className={s.flM} href="#">Privacy</a>
            <a className={s.flM} href="#">Terms</a>
            <span className={s.copyM}>© 2026 [LEGAL ENTITY]. CultureBowl, Cultureverse and all sub-brand names are trademarks.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
