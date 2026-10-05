'use client';

import { useEffect, useRef } from 'react';
import CbLogo from '@/components/CbLogo';
import Link from 'next/link';
import { CONTACT_EMAIL, CONTACT_MAILTO } from '@/lib/site';
import ShopLink from '@/components/ShopLink';
import TicketLink from './TicketLink';
import { srcSet, LOGO_WIDTHS } from '@/lib/img';
import s from './MobileMenu.module.css';

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function MobileMenu({ countdown, onClose }: { countdown: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !ref.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div ref={ref} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className={s.menu}>
      <img className={s.bg} src="/assets/bg-red-fragments.webp" alt="" width={2000} height={1021} />
      <div aria-hidden="true" className={s.navy} />

      <div className={s.top}>
        <CbLogo className={s.logo} />
        <div className={s.grow} />
        <TicketLink className="btn btn-white btn-sm">Tickets</TicketLink>
        <button ref={closeRef} type="button" className={s.x} aria-label="Close menu" onClick={onClose}>
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" stroke="currentColor" strokeWidth="3.2">
            <path d="M2 2l18 18M20 2L2 20" />
          </svg>
        </button>
      </div>

      <nav aria-label="Primary" className={s.nav}>
        <Link className={s.ml} href="/" onClick={onClose}>
          <span className="d">Home</span>
        </Link>
        <Link className={s.ml} href="/about" onClick={onClose}>
          <span className="d">About</span>
        </Link>
        <div className={s.cv}>
          <Link href="/cultureverse" className={s.cvLink} onClick={onClose}>
            <span className="d">The CultureVerse™</span>
            <span className={`hud ${s.cvAbout}`}>About</span>
          </Link>
          <div className={s.subgrid}>
            <Link className={s.sub} href="/iconhonors" onClick={onClose}>
              <img src="/assets/logo-iconhonors.png" srcSet={srcSet("/assets/logo-iconhonors.png", LOGO_WIDTHS, 2000)} sizes="(min-width: 1024px) 1400px, 52px" alt="" width={2000} height={350}  style={{ aspectRatio: '2000 / 350' }} />ICON HONORS
            </Link>
            <Link className={s.sub} href="/exchnge" onClick={onClose}>
              <img src="/assets/logo-exchnge.png" srcSet={srcSet("/assets/logo-exchnge.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 52px" alt="" width={1000} height={271}  style={{ aspectRatio: '1000 / 271' }} />The Culture EXCHNGE™
            </Link>
            <Link className={s.sub} href="/cultureexpo" onClick={onClose}>
              <img src="/assets/logo-cultureexpo.png" srcSet={srcSet("/assets/logo-cultureexpo.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 52px" alt="" width={1000} height={535}  style={{ aspectRatio: '1000 / 535' }} />CultureExpo™
            </Link>
            <Link className={s.sub} href="/biggive" onClick={onClose}>
              <img src="/assets/logo-biggive.png" srcSet={srcSet("/assets/logo-biggive.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 52px" alt="" width={1000} height={477}  style={{ aspectRatio: '1000 / 477' }} />The Culture&apos;s BIG GIVE™
            </Link>
            <Link className={s.sub} href="/culturelive" onClick={onClose}>
              <img src="/assets/logo-culturelive.png" srcSet={srcSet("/assets/logo-culturelive.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 52px" alt="" width={1000} height={502}  style={{ aspectRatio: '1000 / 502' }} />CultureLive™
            </Link>
            <Link className={s.sub} href="/cultureunion" onClick={onClose}>
              <img src="/assets/logo-cultureunion.png" srcSet={srcSet("/assets/logo-cultureunion.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 52px" alt="" width={1000} height={216}  style={{ aspectRatio: '1000 / 216' }} />CultuReunion™
            </Link>
            <Link className={s.sub} href="/culturecoming" onClick={onClose}>
              <img src="/assets/logo-culturecoming.png" srcSet={srcSet("/assets/logo-culturecoming.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 52px" alt="" width={1000} height={122}  style={{ aspectRatio: '1000 / 122' }} />CultureComing™
            </Link>
            <Link className={s.sub} href="/culturegames" onClick={onClose}>
              <img src="/assets/logo-culturegames.png" srcSet={srcSet("/assets/logo-culturegames.png", LOGO_WIDTHS, 1000)} sizes="(min-width: 1024px) 1400px, 52px" alt="" width={1000} height={567}  style={{ aspectRatio: '1000 / 567' }} />CultureGames™
            </Link>
          </div>
        </div>
        <ShopLink className={`${s.ml} ${s.last}`} onClick={onClose}>
          <span className="d">Shop</span>
        </ShopLink>
      </nav>

      <div className={s.bottom}>
        <div className={s.btns}>
          <TicketLink className="btn btn-white">Get tickets</TicketLink>
          <Link className="btn btn-line" href="/tap-in" onClick={onClose}>
            Tap in
          </Link>
        </div>
        <div className={`hud ${s.cdline}`}>Opening night in {countdown}</div>
        <a className={`hud ${s.mail}`} href={CONTACT_MAILTO}>
          {CONTACT_EMAIL}
        </a>
      </div>
    </div>
  );
}
