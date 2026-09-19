/*
 * Writes vercel.json with the security headers. The Content-Security-Policy allows the site itself,
 * Google Fonts, the host of NEXT_PUBLIC_FORM_ENDPOINT and, when NEXT_PUBLIC_GA_ID is set, Google Analytics.
 * Vercel reads vercel.json from the repository before the build, so run this after changing either
 * variable and commit the result:  npm run vercel-config
 * Values come from the environment, then .env.local, then .env; flags --endpoint=<url> --ga=<id> override.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function readEnvFile(name) {
  const p = path.join(ROOT, name);
  if (!fs.existsSync(p)) return {};
  const out = {};
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !line.trim().startsWith('#')) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return out;
}

const fileEnv = { ...readEnvFile('.env'), ...readEnvFile('.env.local') };
const flags = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a, true]; }));
const endpoint = flags.endpoint || process.env.NEXT_PUBLIC_FORM_ENDPOINT || fileEnv.NEXT_PUBLIC_FORM_ENDPOINT || '';
const gaId = flags.ga || process.env.NEXT_PUBLIC_GA_ID || fileEnv.NEXT_PUBLIC_GA_ID || '';

let formOrigin = '';
if (endpoint) {
  try { formOrigin = new URL(endpoint).origin; } catch { console.error(`NEXT_PUBLIC_FORM_ENDPOINT is not a valid URL: ${endpoint}`); process.exit(1); }
}
const ga = /^G-[A-Z0-9]+$/.test(gaId);

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${ga ? ' https://www.googletagmanager.com' : ''}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  `img-src 'self' data:${ga ? ' https://www.google-analytics.com https://www.googletagmanager.com' : ''}`,
  `connect-src 'self'${formOrigin ? ' ' + formOrigin : ''}${ga ? ' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net' : ''}`,
  "object-src 'none'",
  "base-uri 'self'",
  `form-action 'self'${formOrigin ? ' ' + formOrigin : ''}`,
  "frame-ancestors 'self'",
].join('; ');

const config = {
  headers: [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
        { key: 'Content-Security-Policy', value: csp },
      ],
    },
  ],
};

fs.writeFileSync(path.join(ROOT, 'vercel.json'), JSON.stringify(config, null, 2) + '\n');
console.log(`vercel.json written. Form endpoint origin: ${formOrigin || '(none: set NEXT_PUBLIC_FORM_ENDPOINT and run again)'}; analytics: ${ga ? gaId : 'off'}.`);
