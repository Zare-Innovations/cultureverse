'use client';

import { useSyncExternalStore } from 'react';

/** Seconds-since-epoch store that ticks once a second while anyone listens. */
let listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;
let now = Math.floor(Date.now() / 1000);
/** Build time, inlined by next.config so server HTML and the hydration pass agree. Corrected right after hydration. */
const SERVER_NOW = Math.floor(Number(process.env.NEXT_PUBLIC_BUILD_TIME || Date.now()) / 1000);

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    timer = setInterval(() => {
      now = Math.floor(Date.now() / 1000);
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

function getSnapshot() {
  return now;
}

function getServerSnapshot() {
  return SERVER_NOW;
}

export function useNow(): number {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export type Countdown = { d: string; h: string; m: string; s: string };

const p = (n: number) => String(n).padStart(2, '0');

export function countdownTo(targetMs: number, nowSec: number): Countdown {
  let s = Math.max(0, Math.floor(targetMs / 1000) - nowSec);
  const d = Math.floor(s / 86400);
  s %= 86400;
  const h = Math.floor(s / 3600);
  s %= 3600;
  return { d: p(d), h: p(h), m: p(Math.floor(s / 60)), s: p(s % 60) };
}

/** Full countdown, ticking every second. */
export function useCountdown(targetMs: number): Countdown {
  return countdownTo(targetMs, useNow());
}

/** The nav and menu readout: "33D 10H". */
export function useCountdownShort(targetMs: number): string {
  const c = useCountdown(targetMs);
  return `${c.d}D ${c.h}H`;
}
