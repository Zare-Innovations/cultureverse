'use client';

/**
 * next/image loader for the static export. Files that have resized candidates in public/assets/r
 * get the smallest candidate that covers the requested width; everything else is served as is.
 */
const VARIANTS: Record<string, number[]> = {
  'bg-navy-graffiti': [640, 828, 1200],
  'bg-about': [640, 828, 1200],
  'bg-cultureverse': [640, 828, 1200],
  'bg-culturelive': [640, 828, 1200],
  'bg-expo': [640, 828, 1200],
  'bg-exchnge': [640, 828, 1200],
  'bg-biggive': [640, 828, 1200],
  'bg-honors': [640, 828, 1200],
  'bg-cultureunion': [640, 828, 1200],
  'bg-culturecoming': [640, 828, 1200],
  'bg-culturegames': [640, 828, 1200],
  'bg-red-fragments': [640, 828, 1200],
};

const RELATIVE = process.env.NEXT_PUBLIC_RELATIVE_PREVIEW === 'true';

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const m = src.match(/^\/?assets\/([^/]+)\.(webp|png|jpg)$/);
  const rel = (p: string) => (RELATIVE ? p.replace(/^\//, '') : p);
  if (!m) return rel(src);
  const widths = VARIANTS[m[1]];
  if (!widths) return rel(src);
  const pick = widths.find((w) => w >= width);
  return rel(pick ? `/assets/r/${m[1]}-${pick}.webp` : src);
}
