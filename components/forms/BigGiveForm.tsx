'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useJsonForm } from '@/lib/useJsonForm';
import Honeypot from '@/components/Honeypot';
import s from './forms.module.css';

const GROUPS = [
  { id: 'me', label: 'Just me', txt: 'just you' },
  { id: 'friends', label: 'With friends', txt: 'with friends' },
  { id: 'org', label: 'With my organization', txt: 'with your organization' },
] as const;
type GroupId = (typeof GROUPS)[number]['id'];

/** 08-BigGive signup. "Just me" is preselected on both layouts. */
export default function BigGiveForm({ variant }: { variant: 'd' | 'm' }) {
  const [g, setG] = useState<GroupId>('me');
  const extra = useCallback(() => ({ comingAs: g }), [g]);
  const { onSubmit, done, sending, error } = useJsonForm('biggive', extra);
  const p = variant === 'd' ? 'bg' : 'bgm';
  const d = variant === 'd';
  return (
    <form className={d ? s.bgD : s.bgM} onSubmit={onSubmit} aria-busy={sending}>
      {!done ? (
        <>
          <h2 className={`d ${d ? s.bgTitle : s.bgTitleM}`}>Count me in</h2>
          {d ? (
            <div className={s.bgRow}>
              <div>
                <label className="lbl" htmlFor={`${p}-first`}>First name</label>
                <input id={`${p}-first`} name="firstName" className="field field-sm" type="text" autoComplete="given-name" required />
              </div>
              <div>
                <label className="lbl" htmlFor={`${p}-last`}>Last name</label>
                <input id={`${p}-last`} name="lastName" className="field field-sm" type="text" autoComplete="family-name" required />
              </div>
            </div>
          ) : (
            <>
              <div>
                <label className="lbl" htmlFor={`${p}-first`}>First name</label>
                <input id={`${p}-first`} name="firstName" className="field field-sm" type="text" autoComplete="given-name" required />
              </div>
              <div>
                <label className="lbl" htmlFor={`${p}-last`}>Last name</label>
                <input id={`${p}-last`} name="lastName" className="field field-sm" type="text" autoComplete="family-name" required />
              </div>
            </>
          )}
          <div>
            <label className="lbl" htmlFor={`${p}-email`}>Email</label>
            <input id={`${p}-email`} name="email" className="field field-sm" type="email" autoComplete="email" required />
          </div>
          <fieldset className={s.fieldset}>
            <legend className={`lbl ${s.legend}`}>Coming as</legend>
            <div className={s.chips}>
              {GROUPS.map((x) => (
                <button key={x.id} type="button" className={`${s.gtog} ${g === x.id ? s.on : ''}`} aria-pressed={g === x.id} onClick={() => setG(x.id)}>
                  {x.label}
                </button>
              ))}
            </div>
          </fieldset>
          <Honeypot id={`${p}-hp`} />
          <button className={`btn btn-lime ${d ? s.bgSubmit : s.full}`} type="submit" disabled={sending}>Sign me up</button>
          {error && <p className="form-error" role="alert">Something went wrong. Please try again.</p>}
        </>
      ) : (
        <div className={s.doneBlock} role="status">
          <h2 className={`d ${d ? s.bgTitle : s.bgTitleM}`}>You&apos;re in for Saturday</h2>
          {d ? (
            <>
              <p className={s.bgDone}>Signed up {GROUPS.find((x) => x.id === g)?.txt}. Your site and shift arrive by email once they are set.</p>
              <Link className={`btn btn-line ${s.bgSubmit}`} href="/tap-in">Tap in</Link>
            </>
          ) : (
            <p className={s.bgDoneM}>Your site and shift arrive by email once they are set.</p>
          )}
        </div>
      )}
    </form>
  );
}
