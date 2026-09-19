'use client';

import { useCallback, useState, type FormEvent } from 'react';
import { FORM_ENDPOINT } from './site';

export type FormName = 'tap-in' | 'exchnge' | 'biggive' | 'iconhonors';
export type FormStatus = 'idle' | 'sending' | 'done' | 'error';

/** Name of the honeypot input. Bots that fill it get a silent success and nothing is sent. */
export const HONEYPOT = 'website';

/**
 * Posts a form as JSON to NEXT_PUBLIC_FORM_ENDPOINT with a "form" field naming the form.
 * Required fields are validated by the browser before submit fires (the inputs carry `required`).
 */
export function useJsonForm(form: FormName, extra?: () => Record<string, string>) {
  const [status, setStatus] = useState<FormStatus>('idle');

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const el = e.currentTarget;
      if (!el.reportValidity()) return;
      const data: Record<string, string> = {};
      new FormData(el).forEach((v, k) => {
        if (typeof v === 'string') data[k] = v.trim();
      });
      if (data[HONEYPOT]) {
        setStatus('done');
        return;
      }
      delete data[HONEYPOT];
      setStatus('sending');
      try {
        if (!FORM_ENDPOINT) throw new Error('NEXT_PUBLIC_FORM_ENDPOINT is not set');
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ form, ...data, ...(extra ? extra() : {}) }),
        });
        if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
        setStatus('done');
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    },
    [form, extra],
  );

  return { status, onSubmit, done: status === 'done', sending: status === 'sending', error: status === 'error' };
}
