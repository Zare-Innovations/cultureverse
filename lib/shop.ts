/*
 * Product catalog for /shop, read from the Squarespace store at build time.
 *
 * Squarespace publishes every collection as JSON at <store>/<collection>?format=json, with the
 * products, prices, variants, images and descriptions the storefront itself renders. The site is a
 * static export, so the catalog is fetched once per build and baked into the HTML. Prices and new
 * products are therefore as fresh as the last deploy: .github/workflows/rebuild-shop.yml pings the
 * Vercel deploy hook nightly so the shop never drifts more than a day, and a manual redeploy picks
 * up a change immediately.
 *
 * Squarespace has no way for another site to fill its cart, so buying happens on the store: every
 * product here links to its own page there, and checkout, shipping and Printful stay as they are.
 */

/** The Squarespace store. Its collections are read at build time and its product pages take the sale. */
export const SHOP_STORE_URL = (process.env.NEXT_PUBLIC_SHOP_STORE_URL || 'https://www.shopallthingsculturebowl.com').replace(/\/+$/, '');
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

let cache: Promise<ShopCollection[]> | null = null;

/** Every collection with its products, in SHOP_COLLECTIONS order. Fetched once per build. */
export function getCollections(): Promise<ShopCollection[]> {
  if (!cache) cache = loadCollections();
  return cache;
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
    const res = await fetch(url, { headers: { accept: 'application/json' }, cache: 'force-cache' });
    // A failed read must fail the build: a static export with an empty shop would otherwise go live
    // and stay live until someone noticed. Vercel keeps the previous deploy when a build fails.
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
