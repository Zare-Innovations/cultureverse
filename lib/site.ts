export const SITE_NAME = 'All Things CultureBowl™';
export const SITE_URL = 'https://www.allthingsculturebowl.com';

export const TICKET_URL =
  process.env.NEXT_PUBLIC_TICKETMASTER_URL || 'https://www.ticketmaster.com/[CULTUREBOWL EVENT URL]';
/**
 * The shop is a route on this site, fed by the Squarespace store (see lib/shop.ts). Setting
 * NEXT_PUBLIC_SHOP_URL to an absolute URL points every Shop link at an external store instead, which
 * is the way back to linking straight out if the built-in shop ever has to be switched off.
 */
export const SHOP_URL = process.env.NEXT_PUBLIC_SHOP_URL || '/shop';
export const SHOP_IS_EXTERNAL = /^https?:\/\//i.test(SHOP_URL);
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || '';
export const HEADLINER_ANNOUNCED = process.env.NEXT_PUBLIC_HEADLINER_ANNOUNCED === 'true';
/** CultureExpo tickets are not on sale yet: the page shows Notify me until this is "true". */
export const EXPO_TICKETS_ON_SALE = process.env.NEXT_PUBLIC_EXPO_TICKETS_ON_SALE === 'true';
/** How the Expo is labelled wherever the events are listed: it is not a ticketed event until sales open. */
export const EXPO_STATUS = EXPO_TICKETS_ON_SALE ? 'Ticketed' : 'Coming soon';
export const CONTACT_EMAIL = 'team@allthingsculturebowl.com';
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

/** Wed Oct 21, 2026, 12:00 am Eastern. */
export const OPENING_NIGHT_UTC = Date.UTC(2026, 9, 21, 4, 0, 0);
/** The announced hero counts to the CultureLive show. */
export const ANNOUNCED_SHOW_UTC = Date.UTC(2026, 9, 24, 22, 0, 0);

/** Every indexable route, used by the sitemap. */
export const ROUTES = ['/', '/about', '/cultureverse', '/culturelive', '/cultureexpo', '/exchnge', '/biggive', '/iconhonors', '/cultureunion', '/culturecoming', '/culturegames', '/tap-in', '/shop'] as const;

export function pageTitle(page: string): string {
  return `${page} — ${SITE_NAME}`;
}
