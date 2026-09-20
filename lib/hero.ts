import { EVENT_HREF, type EventKey } from './worlds';
import { EXPO_STATUS } from './site';

export type Shard = {
  id: EventKey;
  src: string;
  iw: number;
  ih: number;
  x: number;
  y: number;
  w: number;
  rot: number;
  dp: number;
  fx: number;
  fy: number;
  fr: number;
  d: number;
  glow: string;
  href: string;
  day: string;
  name: string;
  venue: string;
  status: string;
  lx: number;
  ly: number;
};

/** Desktop hero stones (Main.dc.html). Positions are px on the 1440 x 900 frame. */
export const SHARDS_D: Shard[] = [
  { id: 'honors', src: '/assets/stone-ice.webp', iw: 625, ih: 900, x: 100, y: 120, w: 180, rot: -14, dp: 18, fx: -520, fy: -260, fr: -60, d: 150, glow: '#17A2BE', href: EVENT_HREF.honors, day: 'Wed Oct 21', name: 'ICON HONORS', venue: 'Flourish', status: 'Private, by invitation', lx: 10, ly: 270 },
  { id: 'exchnge', src: '/assets/obj-satellite.webp', iw: 900, ih: 530, x: 80, y: 455, w: 200, rot: -8, dp: 10, fx: -640, fy: 120, fr: 20, d: 260, glow: '#3971FF', href: EVENT_HREF.exchnge, day: 'Thu Oct 22', name: 'The Culture EXCHNGE', venue: 'FORWRD Summit at the RETREAT', status: 'Request to attend', lx: 210, ly: 6 },
  { id: 'live', src: '/assets/stone-obsidian.webp', iw: 896, ih: 900, x: 1090, y: 70, w: 240, rot: 12, dp: 16, fx: 560, fy: -280, fr: 70, d: 200, glow: '#FF6F00', href: EVENT_HREF.live, day: 'Sat Oct 24 and Sun Oct 25', name: 'CultureLive™', venue: 'StarJourney Stage, Central Park Atlanta', status: 'Ticketed', lx: -50, ly: 244 },
  { id: 'expo', src: '/assets/stone-blue.webp', iw: 900, ih: 705, x: 1240, y: 280, w: 200, rot: -10, dp: 12, fx: 600, fy: 60, fr: -45, d: 320, glow: '#3971FF', href: EVENT_HREF.expo, day: 'Fri Oct 23 to Sun Oct 25', name: 'CultureExpo™', venue: 'Central Park Atlanta', status: EXPO_STATUS, lx: -240, ly: 60 },
  { id: 'give', src: '/assets/stone-green.webp', iw: 900, ih: 668, x: 640, y: 668, w: 170, rot: 16, dp: 8, fx: 0, fy: 420, fr: 40, d: 380, glow: '#D7F26A', href: EVENT_HREF.give, day: 'Sat Oct 24', name: "The Culture's BIG GIVE™", venue: 'Sites to be announced', status: 'Free, community', lx: 180, ly: -50 },
];

export type ShardM = {
  id: EventKey;
  src: string;
  iw: number;
  ih: number;
  x?: number;
  right?: number;
  y: number;
  w: number;
  rot: number;
  fx: number;
  fy: number;
  fr: number;
  d: number;
  glow: string;
  href: string;
  day: string;
  name: string;
  status: string;
};

/** Mobile hero stones (01-Home-M.dc.html). Right-anchored where the artboard hugs the right edge. */
export const SHARDS_M: ShardM[] = [
  { id: 'honors', src: '/assets/stone-ice.webp', iw: 625, ih: 900, x: -20, y: 112, w: 92, rot: -14, fx: -300, fy: -200, fr: -60, d: 150, glow: '#17A2BE', href: EVENT_HREF.honors, day: 'Wed Oct 21, Flourish', name: 'ICON HONORS', status: 'Private, by invitation' },
  { id: 'live', src: '/assets/stone-obsidian.webp', iw: 896, ih: 900, right: -20, y: 104, w: 104, rot: 12, fx: 300, fy: -200, fr: 70, d: 200, glow: '#FF6F00', href: EVENT_HREF.live, day: 'Sat Oct 24 and Sun Oct 25', name: 'CultureLive™', status: 'Ticketed' },
  { id: 'expo', src: '/assets/stone-blue.webp', iw: 900, ih: 705, x: -28, y: 332, w: 104, rot: -10, fx: -300, fy: 60, fr: -45, d: 320, glow: '#3971FF', href: EVENT_HREF.expo, day: 'Fri Oct 23 to Sun Oct 25', name: 'CultureExpo™', status: EXPO_STATUS },
  { id: 'give', src: '/assets/stone-green.webp', iw: 900, ih: 668, right: -8, y: 336, w: 98, rot: 16, fx: 300, fy: 60, fr: 40, d: 380, glow: '#D7F26A', href: EVENT_HREF.give, day: 'Sat Oct 24', name: "The Culture's BIG GIVE™", status: 'Free, community' },
];

/** Headliner block. Names are confidential placeholders until confirmed in writing. */
export const HEADLINER = 'Cardi B';
export const SUPPORTING = 'Lil Wayne, 2 Chainz and more';
export const ANNOUNCED_WHEN = 'Sat Oct 24';
export const ANNOUNCED_ACCENT = '#FC05A5';
