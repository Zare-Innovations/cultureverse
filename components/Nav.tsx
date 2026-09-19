'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { OPENING_NIGHT_UTC, SHOP_URL } from '@/lib/site';
import { useCountdownShort } from '@/lib/countdown';
import TicketLink from './TicketLink';
import MobileMenu from './MobileMenu';
import s from './Nav.module.css';

const CV_ROUTES = ['/cultureverse', '/iconhonors', '/exchnge', '/cultureexpo', '/biggive', '/culturelive', '/cultureunion', '/culturecoming', '/culturegames'];

function Chevron({ up }: { up?: boolean }) {
  return (
    <svg aria-hidden="true" width="10" height="7" viewBox="0 0 10 7" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={up ? 'M1 5l4-4 4 4' : 'M1 1l4 4 4-4'} />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname() || '/';
  const isHome = pathname === '/';
  const isAbout = pathname.startsWith('/about');
  const isCv = CV_ROUTES.some((r) => pathname.startsWith(r));
  const [scrolled, setScrolled] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const ddWrapRef = useRef<HTMLDivElement>(null);
  const cd = useCountdownShort(OPENING_NIGHT_UTC);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Route change closes everything.
  useEffect(() => {
    setDdOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const openDd = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDdOpen(true);
  }, []);
  const closeDdSoon = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDdOpen(false), 180);
  }, []);
  const onDdBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDdOpen(false);
  }, []);
  const onDdKey = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setDdOpen(false);
      (ddWrapRef.current?.querySelector('a.navlink') as HTMLElement | null)?.focus();
    }
  }, []);

  const headerCls = [s.header, isHome ? s.overHero : '', scrolled ? s.compact : '', ddOpen ? s.ddOpen : ''].filter(Boolean).join(' ');

  return (
    <>
      <header className={headerCls}>
        <div className={s.bar}>
          <nav aria-label="Primary" className={s.inner}>
            <Link href="/" aria-label="CultureBowl home" className={s.logoLink}>
              <img className={`cb-logo-sm ${s.logo}`} src="/assets/logo-culturebowl-white.svg" alt="CultureBowl" width={2115} height={1023} />
            </Link>
            <div className={s.links}>
              <Link className={`navlink${isAbout ? ' is-on' : ''}`} href="/about" aria-current={isAbout ? 'page' : undefined}>
                About
              </Link>
              <div
                ref={ddWrapRef}
                className={s.ddWrap}
                onMouseEnter={openDd}
                onMouseLeave={closeDdSoon}
                onFocus={openDd}
                onBlur={onDdBlur}
                onKeyDown={onDdKey}
              >
                <Link
                  className={`navlink${isCv ? ' is-on' : ''}`}
                  href="/cultureverse"
                  aria-current={pathname === '/cultureverse' ? 'page' : undefined}
                  aria-expanded={ddOpen}
                  aria-controls="cultureverse-menu"
                >
                  The Cultureverse™ <Chevron up={ddOpen} />
                </Link>
                <div id="cultureverse-menu" className={s.dd} hidden={!ddOpen}>
                  <div className={s.ddInner}>
                    <div className={s.ddGrid}>
                      <div className={s.ddIntro}>
                        <img src="/assets/logo-cultureverse.png" alt="The Cultureverse" width={1400} height={711} className={s.ddLogo} />
                        <p className={s.ddCopy}>
                          Welcome to CultureVerse™—the connected world of CultureBowl™, where music, community, creativity, competition, commerce,
                          and culture come together in one shared experience.
                        </p>
                        <Link className={`hud ${s.ddAbout}`} href="/cultureverse">
                          About the CultureVerse™
                        </Link>
                      </div>
                      <div>
                        <p className={`hud ${s.ddHead}`}>October 2026, Atlanta</p>
                        <Link className={s.dditem} href="/iconhonors">
                          <img src="/assets/logo-iconhonors.png" alt="" width={1000} height={144} />
                          The Culture&apos;s Coldest™ ICON HONORS<span className="hud">Wed 21</span>
                        </Link>
                        <Link className={s.dditem} href="/exchnge">
                          <img src="/assets/logo-exchnge.png" alt="" width={1000} height={271} />
                          The Culture EXCHNGE™<span className="hud">Thu 22</span>
                        </Link>
                        <Link className={s.dditem} href="/cultureexpo">
                          <img src="/assets/logo-cultureexpo.png" alt="" width={1000} height={535} />
                          CultureExpo™<span className="hud">Fri 23 to Sun 25</span>
                        </Link>
                        <Link className={s.dditem} href="/biggive">
                          <img src="/assets/logo-biggive.png" alt="" width={1000} height={477} />
                          The Culture&apos;s BIG GIVE™<span className="hud">Sat 24</span>
                        </Link>
                        <Link className={`${s.dditem} ${s.ddLast}`} href="/culturelive">
                          <img src="/assets/logo-culturelive.png" alt="" width={1000} height={502} />
                          CultureLive™<span className="hud">Sat 24, Sun 25</span>
                        </Link>
                      </div>
                      <div>
                        <p className={`hud ${s.ddHead}`}>Coming</p>
                        <Link className={s.dditem} href="/cultureunion">
                          <img src="/assets/logo-cultureunion.png" alt="" width={1000} height={216} />
                          CultuReunion™<span className="hud">2027</span>
                        </Link>
                        <Link className={s.dditem} href="/culturecoming">
                          <img src="/assets/logo-culturecoming.png" alt="" width={1000} height={122} />
                          CultureComing™<span className="hud">To be announced</span>
                        </Link>
                        <Link className={`${s.dditem} ${s.ddLast}`} href="/culturegames">
                          <img src="/assets/logo-culturegames.png" alt="" width={1000} height={567} />
                          CultureGames™<span className="hud">2027</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a className="navlink" href={SHOP_URL}>
                Shop
              </a>
            </div>
            <div className={s.grow} />
            <div className={`hud ${s.cd}`}>
              Opening night in
              <br />
              <span>{cd}</span>
            </div>
            <Link className={`btn btn-line btn-sm ${s.tapin}`} href="/tap-in">
              Tap in
            </Link>
            <TicketLink className={`btn btn-red btn-sm ${s.ticketsD}`}>Get tickets</TicketLink>
            <TicketLink className={`btn btn-red btn-sm ${s.ticketsM}`}>Tickets</TicketLink>
            <button
              ref={burgerRef}
              type="button"
              className={s.burger}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <svg aria-hidden="true" width="28" height="18" viewBox="0 0 28 18" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M0 3h28M8 15h20" />
              </svg>
            </button>
          </nav>
        </div>
        {menuOpen && (
          <MobileMenu
            countdown={cd}
            onClose={() => {
              setMenuOpen(false);
              burgerRef.current?.focus();
            }}
          />
        )}
      </header>
      {!isHome && <div className={s.spacer} aria-hidden="true" />}
    </>
  );
}
