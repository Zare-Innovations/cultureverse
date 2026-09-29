/*
 * Generates responsive WebP variants of the large stones and logos into public/assets/r/.
 * The originals stay untouched; components reference the variants through srcset.
 * Usage: node scripts/resize.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'public', 'assets');
const OUT = path.join(SRC, 'r');
fs.mkdirSync(OUT, { recursive: true });

const JOBS = [
  ...['stone-ice', 'stone-obsidian', 'stone-blue', 'stone-green', 'stone-red', 'stone-orange', 'stone-purple', 'obj-satellite', 'obj-orb'].map((n) => ({ file: `${n}.webp`, widths: [260, 520] })),
  // The ICON HONORS objects render up to 320 CSS px, so they carry a candidate for 2x displays.
  ...['obj-shell', 'obj-ring', 'obj-coil', 'obj-lattice'].map((n) => ({ file: `${n}.webp`, widths: [260, 520, 800] })),
  ...['logo-cultureverse', 'logo-culturelive', 'logo-cultureexpo', 'logo-culturegames', 'logo-cultureunion', 'logo-culturecoming', 'logo-exchnge', 'logo-biggive', 'logo-culturebowl-iheart'].map((n) => ({ file: `${n}.png`, widths: [400, 800] })),
  // ICON HONORS is the one mark that renders large (900 CSS px), so it carries an extra candidate.
  { file: 'logo-iconhonors.png', widths: [400, 800, 1200] },
  { file: 'obj-globe.webp', widths: [600] },
  // Hero backgrounds: phone-sized candidates for next/image's srcset (the custom loader in lib/imageLoader.ts picks them).
  ...['bg-navy-graffiti', 'bg-about', 'bg-cultureverse', 'bg-culturelive', 'bg-expo', 'bg-exchnge', 'bg-biggive', 'bg-honors', 'bg-honors-keyart', 'bg-cultureunion', 'bg-culturecoming', 'bg-culturegames', 'bg-red-fragments'].map((n) => ({ file: `${n}.webp`, widths: [640, 828, 1200] })),
];

(async () => {
  for (const job of JOBS) {
    const base = job.file.replace(/\.\w+$/, '');
    for (const w of job.widths) {
      const out = path.join(OUT, `${base}-${w}.webp`);
      const lossless = job.file.endsWith('.png'); // logos: flat colour, keep them exact
      await sharp(path.join(SRC, job.file)).resize({ width: w, withoutEnlargement: true }).webp(lossless ? { lossless: true, effort: 6 } : { quality: 90, alphaQuality: 95, effort: 6 }).toFile(out);
      console.log(`${base}-${w}.webp ${Math.round(fs.statSync(out).size / 1024)}K`);
    }
  }
})();
