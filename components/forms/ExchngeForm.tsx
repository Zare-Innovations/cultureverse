'use client';

import { useJsonForm } from '@/lib/useJsonForm';
import Honeypot from '@/components/Honeypot';
import s from './forms.module.css';

/** 07-EXCHNGE join form: name and email, the Tap In button. `variant` picks the desktop panel or the mobile stack. */
export default function ExchngeForm({ variant }: { variant: 'd' | 'm' }) {
  const { onSubmit, done, sending, error } = useJsonForm('exchnge');
  const p = variant === 'd' ? 'fw' : 'fwm';
  return (
    <form className={variant === 'd' ? s.exD : s.exM} onSubmit={onSubmit} aria-busy={sending}>
      {!done ? (
        <>
          <h2 className={`d ${variant === 'd' ? s.exTitle : s.exTitleM}`}>Join the Exchange</h2>
          <p className={variant === 'd' ? s.exLead : s.exLeadM}>Share ideas. Shape possibilities. Build what comes next.</p>
          <div>
            <label className="lbl" htmlFor={`${p}-name`}>Name</label>
            <input id={`${p}-name`} name="name" className="field field-sm" type="text" autoComplete="name" required />
          </div>
          <div>
            <label className="lbl" htmlFor={`${p}-email`}>Email</label>
            <input id={`${p}-email`} name="email" className="field field-sm" type="email" autoComplete="email" required />
          </div>
          <Honeypot id={`${p}-hp`} />
          {variant === 'd' ? (
            <div className={s.exActions}>
              <button className="btn btn-red" type="submit" disabled={sending}>Tap in</button>
            </div>
          ) : (
            <>
              <button className={`btn btn-red ${s.full} ${s.exBtnM}`} type="submit" disabled={sending}>Tap in</button>
            </>
          )}
          {error && <p className="form-error" role="alert">Something went wrong. Please try again.</p>}
        </>
      ) : (
        <div className={s.doneBlock} role="status">
          <h2 className={`d ${variant === 'd' ? s.exTitle : s.exTitleM}`}>You&apos;re in the Exchange</h2>
          <p className={variant === 'd' ? s.exDone : s.exDoneM}>Watch your inbox for what comes next.</p>
        </div>
      )}
    </form>
  );
}
