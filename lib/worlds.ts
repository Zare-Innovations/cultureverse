/** Data shared by the hero stones, the Cultureverse hub, the nav dropdown and the coming-world pages. */

export type EventKey = 'honors' | 'exchnge' | 'expo' | 'give' | 'live';

export const EVENT_HREF: Record<EventKey, string> = {
  honors: '/iconhonors',
  exchnge: '/exchnge',
  expo: '/cultureexpo',
  give: '/biggive',
  live: '/culturelive',
};

export type WorldKey = 'reunion' | 'coming' | 'games';

export type World = {
  key: WorldKey;
  route: string;
  name: string;
  mark: string;
  markW: number;
  markH: number;
  mw: number;
  mwM: number;
  shard: string;
  shardW: number;
  shardH: number;
  glow: string;
  bg: string;
  bgc: string;
  when: string;
  line: string;
  copy: string;
  sub: string;
  rot: number;
};

export const WORLDS: Record<WorldKey, World> = {
  reunion: {
    key: 'reunion',
    route: '/cultureunion',
    name: 'CultuReunion™',
    mark: '/assets/logo-cultureunion.png',
    markW: 1000,
    markH: 216,
    mw: 520,
    mwM: 300,
    shard: '/assets/stone-red.webp',
    shardW: 719,
    shardH: 900,
    glow: '#F6003A',
    bg: '/assets/bg-cultureunion.webp',
    bgc: '#8a0020',
    when: 'Coming 2027',
    line: 'Reunited and right at home',
    copy: 'CultuReunion™ brings family, friends, and community together for music, food, games, local vendors, and moments that give back. Part cookout. Part celebration. All love.',
    sub: 'One big family',
    rot: 16,
  },
  coming: {
    key: 'coming',
    route: '/culturecoming',
    name: 'CultureComing™',
    mark: '/assets/logo-culturecoming.png',
    markW: 1000,
    markH: 122,
    mw: 520,
    mwM: 300,
    shard: '/assets/stone-orange.webp',
    shardW: 609,
    shardH: 900,
    glow: '#FF6F00',
    bg: '/assets/bg-culturecoming.webp',
    bgc: '#111821',
    when: 'The culture’s biggest homecoming',
    line: 'All eyes on us',
    copy: 'CultureComing™ brings the spirit of an HBCU homecoming to CultureBowl™ through National Pan-Hellenic Council–led activations, games, and live experiences.',
    sub: 'Rep your school. Celebrate the culture. Be the first to know when dates drop.',
    rot: -14,
  },
  games: {
    key: 'games',
    route: '/culturegames',
    name: 'CultureGames™',
    mark: '/assets/logo-culturegames.png',
    markW: 1000,
    markH: 567,
    mw: 420,
    mwM: 240,
    shard: '/assets/stone-purple.webp',
    shardW: 557,
    shardH: 900,
    glow: '#9B4DFF',
    bg: '/assets/bg-culturegames.webp',
    bgc: '#03301B',
    when: 'Coming 2027',
    line: 'Play hard. Bring your game. Win it all.',
    copy: 'Stay tuned.',
    sub: '',
    rot: -20,
  },
};
