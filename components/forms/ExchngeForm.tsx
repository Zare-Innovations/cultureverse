'use client';

import { useJsonForm } from '@/lib/useJsonForm';
import Honeypot from '@/components/Honeypot';
import s from './forms.module.css';

/** 07-EXCHNGE request-to-attend form. `variant` picks the desktop panel or the mobile stack. */
export default function ExchngeForm({ variant }: { variant: 'd' | 'm' }) {
  const { onSubmit, done, sending, error } = useJsonForm('exchnge');
  const p = variant === 'd' ? 'fw' : 'fwm';
  return (
    <form className={variant === 'd' ? s.exD : s.exM} onSubmit={onSubmit} aria-busy={sending}>
      {!done ? (
        <>
          <h2 className={`d ${variant === 'd' ? s.exTitle : s.exTitleM}`}>Request to attend</h2>
          <div>
            <label className="lbl" htmlFor={`${p}-name`}>Name</label>
            <input id={`${p}-name`} name="name" className="field field-sm" type="text" autoComplete="name" required />
          </div>
          <div>
            <label className="lbl" htmlFor={`${p}-email`}>Email</label>
            <input id={`${p}-email`} name="email" className="field field-sm" type="email" autoComplete="email" required />
          </div>
          <div>
            <label className="lbl" htmlFor={`${p}-co`}>Company or project</label>
            <input id={`${p}-co`} name="company" className="field field-sm" type="text" autoComplete="organization" />
          </div>
          <Honeypot id={`${p}-hp`} />
          {variant === 'd' ? (
            <div className={s.exActions}>
              <button className="btn btn-red" type="submit" disabled={sending}>Send request</button>
              <span className={s.exNote}>Every request is reviewed. Speakers to be announced.</span>
            </div>
          ) : (
            <>
              <button className={`btn btn-red ${s.full} ${s.exBtnM}`} type="submit" disabled={sending}>Send request</button>
              <p className={s.exNoteM}>Every request is reviewed. Speakers to be announced.</p>
            </>
          )}
          {error && <p className="form-error" role="alert">Something went wrong. Please try again.</p>}
        </>
      ) : (
        <div className={s.doneBlock} role="status">
          <h2 className={`d ${variant === 'd' ? s.exTitle : s.exTitleM}`}>Request received</h2>
          <p className={variant === 'd' ? s.exDone : s.exDoneM}>Watch your inbox once review is complete.</p>
        </div>
      )}
    </form>
  );
}
