'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { assetUrl } from '@/lib/assetUrl';

type Props = { desktop: string; mobile: string; className?: string; style?: CSSProperties };

/**
 * Ambient background video. It starts only after the page's load event, picks the smaller file under 1024px,
 * stays off under prefers-reduced-motion or Save-Data, and fades in over whatever sits behind it.
 */
export default function BgVideo({ desktop, mobile, className, style }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || nav.connection?.saveData) return;
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      v.muted = true;
      v.src = assetUrl(window.matchMedia('(min-width: 1024px)').matches ? desktop : mobile);
      v.play()
        .then(() => {
          if (!cancelled) setPlaying(true);
        })
        .catch(() => {});
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', start);
    };
  }, [desktop, mobile]);

  return (
    <video ref={ref} className={className} style={style} data-playing={playing ? '' : undefined} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
  );
}
