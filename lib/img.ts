/** srcset pointing at the resized WebP variants in public/assets/r plus the original as the largest candidate. */
export function srcSet(file: string, widths: number[], originalWidth?: number): string {
  const base = file.replace(/^\/assets\//, '').replace(/\.\w+$/, '');
  const list = widths.map((w) => `/assets/r/${base}-${w}.webp ${w}w`);
  if (originalWidth) list.push(`${file} ${originalWidth}w`);
  return list.join(', ');
}

export const STONE_WIDTHS = [260, 520];
export const LOGO_WIDTHS = [400, 800];
