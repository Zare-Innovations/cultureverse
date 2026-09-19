'use client';

import { useJsonForm } from '@/lib/useJsonForm';
import Honeypot from '@/components/Honeypot';
import s from './forms.module.css';

/** 09-IconHonors "Notify me" form. */
export default function HonorsForm({ variant }: { variant: 'd' | 'm' }) {
  const { onSubmit, done, sending, error } = useJsonForm('iconhonors');
  const d = variant === 'd';
  const id = d ? 'hon-email' : 'hon-m-email';
  return (
    <form className={d ? s.hnD : s.hnM} onSubmit={onSubmit} aria-busy={sending}>
      {!done ? (
        <>
          <label className={`serif ${d ? s.hnLabel : s.hnLabelM}`} htmlFor={id}>Be told when the honorees are named.</label>
          {d ? (
            <div className={s.hnGrow}>
              <input id={id} name="email" className={s.hfield} type="email" placeholder="Email address" autoComplete="email" required />
            </div>
          ) : (
            <input id={id} name="email" className={`${s.hfield} ${s.hfieldM}`} type="email" placeholder="Email address" autoComplete="email" required />
          )}
          <Honeypot id={`${id}-hp`} />
          <button className={`btn btn-ice ${d ? '' : s.full}`} type="submit" disabled={sending}>Notify me</button>
          {error && <p className={`form-error ${s.hnError}`} role="alert">Something went wrong. Please try again.</p>}
        </>
      ) : (
        <p className={`serif ${d ? s.hnDone : s.hnDoneM}`} role="status">You will hear it here first.</p>
      )}
    </form>
  );
}
