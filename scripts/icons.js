/*
 * Generates the site icons and the Open Graph image from public/assets/logo-culturebowl.png:
 *   app/icon.png (256), app/apple-icon.png (180), app/favicon.ico (48, PNG-in-ICO), public/og-image.png (1200x630).
 * Usage: node scripts/icons.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const LOGO = path.join(ROOT, 'public', 'assets', 'logo-culturebowl.png');
const NAVY = { r: 17, g: 24, b: 33, alpha: 1 };

async function badge(size, pad, out) {
  const inner = size - pad * 2;
  const logo = await sharp(LOGO).resize({ width: inner, height: inner, fit: 'inside' }).toBuffer();
  const meta = await sharp(logo).metadata();
  await sharp({ create: { width: size, height: size, channels: 4, background: NAVY } })
    .composite([{ input: logo, left: Math.round((size - meta.width) / 2), top: Math.round((size - meta.height) / 2) }])
    .png()
    .toFile(out);
  return out;
}

function ico(pngBuffer, size) {
  // ICO container with a single PNG-compressed entry.
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0); entry.writeUInt8(size === 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2); entry.writeUInt8(0, 3); entry.writeUInt16LE(1, 4); entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8); entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, pngBuffer]);
}

(async () => {
  await badge(256, 20, path.join(ROOT, 'app', 'icon.png'));
  await badge(180, 18, path.join(ROOT, 'app', 'apple-icon.png'));
  const fav = await badge(48, 4, path.join(ROOT, 'app', 'favicon-48.png'));
  fs.writeFileSync(path.join(ROOT, 'app', 'favicon.ico'), ico(fs.readFileSync(fav), 48));
  fs.unlinkSync(fav);
  // Open Graph: logo centred on navy, 1200 x 630.
  const logo = await sharp(LOGO).resize({ width: 760, height: 400, fit: 'inside' }).toBuffer();
  const m = await sharp(logo).metadata();
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: NAVY } })
    .composite([{ input: logo, left: Math.round((1200 - m.width) / 2), top: Math.round((630 - m.height) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(ROOT, 'public', 'og-image.png'));
  for (const f of ['app/icon.png', 'app/apple-icon.png', 'app/favicon.ico', 'public/og-image.png']) console.log(f, Math.round(fs.statSync(path.join(ROOT, f)).size / 1024) + 'K');
})();
