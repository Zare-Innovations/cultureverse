/*
 * Product catalog for /shop, read from the Squarespace store at build time.
 *
 * Squarespace publishes every collection as JSON at <store>/<collection>?format=json, with the
 * products, prices, variants, images and descriptions the storefront itself renders. On Vercel the
 * shop pages are cached and re-read from the store once a copy is older than SHOP_REVALIDATE
 * seconds, so an edit in Squarespace shows here within minutes with no deploy. If the store cannot
 * be reached, the last good copy keeps being served. A STATIC_EXPORT build (the preview, the local
 * checks) reads the catalog once and bakes it in.
 *
 * Squarespace has no way for another site to fill its cart, so buying happens on the store: every
 * product here links to its own page there, and checkout, shipping and Printful stay as they are.
 */

/** The Squarespace store. Its collections are read at build time and its product pages take the sale. */
export const SHOP_STORE_URL = (process.env.NEXT_PUBLIC_SHOP_STORE_URL || 'https://www.shopallthingsculturebowl.com').replace(/\/+$/, '');
/** How long a cached copy of the catalog is served before it is re-read from the store, in seconds. */
export const SHOP_REVALIDATE = 300;
const STATIC_EXPORT = process.env.STATIC_EXPORT === 'true';
/** The collection slugs to read, in the order they appear on /shop. */
export const SHOP_COLLECTIONS = (process.env.NEXT_PUBLIC_SHOP_COLLECTIONS || 'apparel,hats').split(',').map((c) => c.trim()).filter(Boolean);

export type Money = { amount: string; currencyCode: string };

export type ShopImage = { url: string; width: number; height: number };

export type ShopOption = { name: string; values: string[] };

export type ShopProduct = {
  /** Squarespace's URL id, unique across the store. */
  handle: string;
  title: string;
  /** Plain-text description, paragraph by paragraph. Bullet lines start with "• ". */
  description: string[];
  images: ShopImage[];
  /** Lowest variant price, what the card shows. */
  priceFrom: Money;
  /** Highest variant price; equal to priceFrom when every variant costs the same. */
  priceTo: Money;
  onSale: boolean;
  options: ShopOption[];
  /** The product's page on the store, where the sale happens. */
  storeUrl: string;
  collection: string;
  collectionTitle: string;
  updatedOn: number;
};

export type ShopCollection = { slug: string; title: string; products: ShopProduct[] };

/** The widths Squarespace's image CDN serves through its ?format= parameter. */
const CDN_WIDTHS = [300, 500, 750, 1000, 1500];

/** Builds an src and srcSet for a Squarespace CDN image at the widths it serves. */
export function cdnSrc(img: ShopImage, width: number): string {
  return `${img.url}?format=${width}w`;
}
export function cdnSrcSet(img: ShopImage): string {
  return CDN_WIDTHS.filter((w) => w <= Math.max(img.width, 300)).map((w) => `${cdnSrc(img, w)} ${w}w`).join(', ');
}

export function formatMoney(m: Money): string {
  const n = Number(m.amount);
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: m.currencyCode || 'USD', minimumFractionDigits: 2 });
  return fmt.format(n);
}

/** "from $81.50" when the variants span a range, otherwise the one price. */
export function formatPrice(p: ShopProduct): string {
  return p.priceFrom.amount === p.priceTo.amount ? formatMoney(p.priceFrom) : `from ${formatMoney(p.priceFrom)}`;
}

/* ---------- Squarespace's JSON, only as much of it as the shop reads ---------- */

type SqsMoney = { currency: string; value: string };
type SqsVariant = { attributes?: Record<string, string>; priceMoney?: SqsMoney; salePriceMoney?: SqsMoney; onSale?: boolean };
type SqsImage = { assetUrl?: string; originalSize?: string };
type SqsItem = {
  urlId: string;
  title: string;
  fullUrl: string;
  excerpt?: string;
  body?: string;
  updatedOn?: number;
  items?: SqsImage[];
  structuredContent?: { variantOptionOrdering?: string[]; variants?: SqsVariant[]; onSale?: boolean };
  variants?: SqsVariant[];
};
type SqsCollectionPage = { collection?: { title?: string; urlId?: string }; items?: SqsItem[] };

/** Turns Squarespace's excerpt HTML into plain paragraphs. */
function describe(html: string | undefined): string[] {
  if (!html) return [];
  const text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;|&lsquo;/g, '’')
    .replace(/&ldquo;|&rdquo;/g, '"')
    // Printful's "Imprint Method" line sometimes runs into the previous bullet, and sometimes loses its space.
    .replace(/\s*Imprint Method:\s*/g, '\n\nImprint method: ');
  const out: string[] = [];
  let para: string[] = [];
  const flush = () => { if (para.length) { out.push(para.join(' ')); para = []; } };
  for (const raw of text.split('\n')) {
    const line = raw.replace(/\s+/g, ' ').trim();
    if (!line) { flush(); continue; }
    if (line.startsWith('•')) { flush(); out.push('• ' + line.slice(1).trim()); continue; }
    para.push(line);
  }
  flush();
  return out;
}

function toProduct(item: SqsItem, collection: string, collectionTitle: string): ShopProduct | null {
  if (!item.urlId || !item.title) return null;
  const variants = item.structuredContent?.variants ?? item.variants ?? [];
  const prices = variants.map((v) => (v.onSale && v.salePriceMoney && Number(v.salePriceMoney.value) > 0 ? v.salePriceMoney : v.priceMoney)).filter((m): m is SqsMoney => !!m && m.value !== undefined);
  if (!prices.length) return null;
  const sorted = [...prices].sort((a, b) => Number(a.value) - Number(b.value));
  const money = (m: SqsMoney): Money => ({ amount: Number(m.value).toFixed(2), currencyCode: m.currency || 'USD' });
  const order = item.structuredContent?.variantOptionOrdering ?? [];
  const options: ShopOption[] = order.map((name) => ({
    name,
    values: Array.from(new Set(variants.map((v) => v.attributes?.[name]).filter((x): x is string => !!x))),
  })).filter((o) => o.values.length > 0);
  const images: ShopImage[] = (item.items ?? [])
    .filter((im) => !!im.assetUrl)
    .map((im) => {
      const m = /^(\d+)x(\d+)$/.exec(im.originalSize || '');
      return { url: im.assetUrl as string, width: m ? Number(m[1]) : 1000, height: m ? Number(m[2]) : 1000 };
    });
  return {
    handle: item.urlId,
    title: item.title.trim(),
    description: describe(item.excerpt || item.body),
    images,
    priceFrom: money(sorted[0]),
    priceTo: money(sorted[sorted.length - 1]),
    onSale: variants.some((v) => v.onSale),
    options,
    storeUrl: `${SHOP_STORE_URL}${item.fullUrl}`,
    collection,
    collectionTitle,
    updatedOn: item.updatedOn ?? 0,
  };
}

/**
 * Every collection with its products, in SHOP_COLLECTIONS order. Next's fetch cache dedupes the
 * reads within a render and holds them for SHOP_REVALIDATE seconds between renders.
 */
export function getCollections(): Promise<ShopCollection[]> {
  return loadCollections();
}

/** Every product across the collections. */
export async function getCatalog(): Promise<ShopProduct[]> {
  return (await getCollections()).flatMap((c) => c.products);
}

export async function getProduct(handle: string): Promise<ShopProduct | undefined> {
  return (await getCatalog()).find((p) => p.handle === handle);
}

async function loadCollections(): Promise<ShopCollection[]> {
  const out: ShopCollection[] = [];
  for (const slug of SHOP_COLLECTIONS) {
    const url = `${SHOP_STORE_URL}/${slug}?format=json`;
    const res = await fetch(url, { headers: { accept: 'application/json' }, next: { revalidate: STATIC_EXPORT ? false : SHOP_REVALIDATE } });
    // A failed read throws: at build time that fails the build (Vercel keeps the previous deploy);
    // at refresh time Next keeps serving the last good copy and tries again later.
    if (!res.ok) throw new Error(`Shop: ${url} answered ${res.status}. The store may be down or the collection renamed; set NEXT_PUBLIC_SHOP_COLLECTIONS to the current slugs.`);
    const page = (await res.json()) as SqsCollectionPage;
    const title = titleCase(page.collection?.title || slug);
    const products = (page.items ?? []).map((it) => toProduct(it, slug, title)).filter((p): p is ShopProduct => !!p);
    out.push({ slug, title, products });
  }
  return out;
}

/** Squarespace stores the collection titles shouting ("APPAREL"); the site sets its own case. */
function titleCase(s: string): string {
  return s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());
}
