'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useId } from 'react';
import { useJsonForm } from '@/lib/useJsonForm';
import Honeypot from './Honeypot';
import TicketLink from './TicketLink';
import s from './StayTappedIn.module.css';

/** 11-StayTappedIn: the signup band. Used above the footer on Home and CultureVerse and as the /tap-in page. */
export default function StayTappedIn({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const id = useId();
  const { onSubmit, done, sending, error } = useJsonForm('tap-in');
  const Heading = headingLevel;

  return (
    <section id="join" className={`page ${s.band}`} aria-labelledby={`${id}-title`}>
      <Image className="bgimg" src="/assets/bg-cultureverse.webp" alt="" fill sizes="100vw" style={{ opacity: 0.8 }} />
      <div aria-hidden="true" className={s.field} />
      <div className={`wrap ${s.wrap}`}>
        <div className={s.left}>
          <div className={s.lockup}>
            <img className={s.logo} src="/assets/logo-culturebowl-white.svg" alt="CultureBowl" width={2115} height={1023} />
            <img className={s.powered} src="/assets/logo-powered-by-iheart.png" alt="Powered by iHeartMedia" width={1000} height={61} />
          </div>
          <Heading id={`${id}-title`} className={`d ${s.title}`}>
            Stay tapped in
          </Heading>
          <p className={s.copy}>
            Get first access to CultureBowl™ announcements, artist lineups, ticket updates, exclusive experiences, merch drops, CultureVerse™ news,
            and so much more.
          </p>
        </div>

        <form className={s.form} onSubmit={onSubmit} aria-busy={sending}>
          {!done ? (
            <>
              <p className={`d ${s.name}`}>Name</p>
              <div className={s.row}>
                <div>
                  <label className="lbl" htmlFor={`${id}-first`}>First name (required)</label>
                  <input id={`${id}-first`} name="firstName" className={`field ${s.input}`} type="text" autoComplete="given-name" required />
                </div>
                <div>
                  <label className="lbl" htmlFor={`${id}-last`}>Last name (required)</label>
                  <input id={`${id}-last`} name="lastName" className={`field ${s.input}`} type="text" autoComplete="family-name" required />
                </div>
              </div>
              <div>
                <label className="lbl" htmlFor={`${id}-email`}>Email (required)</label>
                <input id={`${id}-email`} name="email" className={`field ${s.input}`} type="email" placeholder="you@email.com" autoComplete="email" required />
              </div>
              <Honeypot id={`${id}-hp`} />
              <div className={s.actions}>
                <button className="btn btn-red" type="submit" disabled={sending}>Tap In</button>
                <p className={s.terms}>By joining you agree to the [TERMS] and [PRIVACY POLICY]. Unsubscribe any time.</p>
              </div>
              {error && <p className="form-error" role="alert">Something went wrong. Please try again.</p>}
            </>
          ) : (
            <div className={s.done} role="status">
              <p className={`d ${s.doneTitle}`}>You&apos;re in.</p>
              <p className={s.doneCopy}>Lineups, tickets and CultureVerse news will reach you first. Watch your inbox for a confirmation.</p>
              <div className={s.doneBtns}>
                <TicketLink className="btn btn-red">Get tickets</TicketLink>
                <Link className="btn btn-line" href="/cultureverse">Explore the CultureVerse</Link>
              </div>
            </div>
          )}
        </form>

        <img className={s.mcf} src="/assets/logo-moving-culture-forward.png" alt="Moving Culture Forward" width={1000} height={54} loading="lazy" />
      </div>
    </section>
  );
}
