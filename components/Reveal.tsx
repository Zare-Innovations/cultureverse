'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Scroll reveal: the child lifts into place the first time it enters the viewport.
 * The transition itself lives in .rv (styles/cb2.css), where prefers-reduced-motion
 * flattens it to a no-op, so this only ever toggles a class.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((en) => en.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`rv${inView ? ' is-in' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--d': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
