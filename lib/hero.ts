import { EVENT_HREF, WORLDS, type EventKey, type WorldKey } from './worlds';
import { EXPO_STATUS } from './site';

export type Shard = {
  /** Event worlds and the coming-soon worlds both put a stone in the hero. */
  id: EventKey | WorldKey;
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
  { id: 'games', src: WORLDS.games.shard, iw: WORLDS.games.shardW, ih: WORLDS.games.shardH, x: -46, y: 58, w: 150, rot: -20, dp: 20, fx: -520, fy: -300, fr: -70, d: 120, glow: WORLDS.games.glow, href: WORLDS.games.route, day: 'Coming 2027', name: WORLDS.games.name, venue: '', status: 'Coming soon', lx: 40, ly: 200 },
  { id: 'honors', src: '/assets/stone-ice.webp', iw: 625, ih: 900, x: 116, y: 104, w: 186, rot: -14, dp: 18, fx: -520, fy: -260, fr: -60, d: 150, glow: '#17A2BE', href: EVENT_HREF.honors, day: 'Wed Oct 21', name: 'ICON HONORS', venue: 'Flourish', status: 'Private, by invitation', lx: 14, ly: 212 },
  { id: 'coming', src: WORLDS.coming.shard, iw: WORLDS.coming.shardW, ih: WORLDS.coming.shardH, x: -62, y: 272, w: 166, rot: 12, dp: 14, fx: -600, fy: 160, fr: 40, d: 300, glow: WORLDS.coming.glow, href: WORLDS.coming.route, day: 'Dates to come', name: WORLDS.coming.name, venue: '', status: 'Coming soon', lx: 150, ly: 190 },
  { id: 'exchnge', src: '/assets/obj-satellite.webp', iw: 900, ih: 530, x: 206, y: 408, w: 112, rot: -8, dp: 10, fx: -640, fy: 120, fr: 20, d: 260, glow: '#3971FF', href: EVENT_HREF.exchnge, day: 'Thu Oct 22', name: 'The Culture EXCHNGE', venue: 'FORWRD Summit at the RETREAT', status: 'Request to attend', lx: 150, ly: 10 },
  { id: 'live', src: '/assets/stone-obsidian.webp', iw: 896, ih: 900, x: 1062, y: 112, w: 202, rot: 12, dp: 16, fx: 560, fy: -280, fr: 70, d: 200, glow: '#FF6F00', href: EVENT_HREF.live, day: 'Sat Oct 24 and Sun Oct 25', name: 'CultureLive™', venue: 'StarJourney Stage, Central Park Atlanta', status: 'Ticketed', lx: -40, ly: 250 },
  { id: 'expo', src: '/assets/stone-blue.webp', iw: 900, ih: 705, x: 1208, y: 258, w: 154, rot: -10, dp: 12, fx: 600, fy: 60, fr: -45, d: 320, glow: '#3971FF', href: EVENT_HREF.expo, day: 'Fri Oct 23 to Sun Oct 25', name: 'CultureExpo™', venue: 'Central Park Atlanta', status: EXPO_STATUS, lx: -250, ly: 70 },
  { id: 'give', src: '/assets/stone-green.webp', iw: 900, ih: 668, x: 1296, y: 80, w: 152, rot: 16, dp: 8, fx: 520, fy: -300, fr: 40, d: 380, glow: '#D7F26A', href: EVENT_HREF.give, day: 'Sat Oct 24', name: "The Culture's BIG GIVE™", venue: 'Sites to be announced', status: 'Free, community', lx: -230, ly: 180 },
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
