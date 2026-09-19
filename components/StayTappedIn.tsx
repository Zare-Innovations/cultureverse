'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useId } from 'react';
import { useJsonForm } from '@/lib/useJsonForm';
import Honeypot from './Honeypot';
import TicketLink from './TicketLink';
import s from './StayTappedIn.module.css';

/** 11-StayTappedIn: the signup band. Used above the footer on Home and Cultureverse and as the /tap-in page. */
export default function StayTappedIn({ priority = false, headingLevel = 'h2' }: { priority?: boolean; headingLevel?: 'h1' | 'h2' }) {
  const id = useId();
  const { onSubmit, done, sending, error } = useJsonForm('tap-in');
  const Heading = headingLevel;

  return (
    <section id="join" className={`page ${s.band}`} aria-labelledby={`${id}-title`}>
      <Image className="bgimg" src="/assets/bg-cultureverse.webp" alt="" fill sizes="100vw" priority={priority} style={{ opacity: 0.8 }} />
      <div aria-hidden="true" className={s.field} />
      <div className={`wrap ${s.wrap}`}>
        <div className={s.left}>
          <img className={s.logo} src="/assets/logo-cultureverse.png" alt="The Cultureverse" width={1400} height={711} />
          <Heading id={`${id}-title`} className={`d ${s.title}`}>
            Stay<br className={s.br} /> tapped in
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
              <p className={s.doneCopy}>Lineups, tickets and Cultureverse news will reach you first. Watch your inbox for a confirmation.</p>
              <div className={s.doneBtns}>
                <TicketLink className="btn btn-red">Get tickets</TicketLink>
                <Link className="btn btn-line" href="/cultureverse">Explore the Cultureverse</Link>
              </div>
            </div>
          )}
        </form>

        <div className={s.stones} aria-hidden="true">
          <img src="/assets/stone-ice.webp" alt="" width={625} height={900} />
          <img src="/assets/stone-obsidian.webp" alt="" width={896} height={900} />
          <img src="/assets/stone-blue.webp" alt="" width={900} height={705} />
          <img src="/assets/stone-green.webp" alt="" width={900} height={668} />
        </div>
      </div>
    </section>
  );
}
