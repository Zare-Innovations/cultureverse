/*
 * Product catalog for /shop.
 *
 * The site is a static export, so the catalog is read once at build time and baked into the
 * HTML. Nothing here runs in the browser. That means prices and stock are only as fresh as the
 * last deploy: wire a Shopify "products update" webhook to a Vercel deploy hook to keep them
 * honest, or move the shop off the static export if you ever need live inventory.
 *
 * Shopify Storefront API tokens are designed to be public, which is why these are NEXT_PUBLIC_:
 * the browser needs the same token to turn a bag into a checkout (see lib/cart.ts).
 */

/** Pinned so a Shopify release cannot change the response shape under us. Bump deliberately. */
export const SHOPIFY_API_VERSION = '2025-01';

export const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || '';
export const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '';
/** Renders the placeholder catalog below so the shop can be designed and reviewed before a store exists. */
export const SHOP_DEMO = process.env.NEXT_PUBLIC_SHOP_DEMO === 'true';

export type Money = { amount: string; currencyCode: string };

export type ShopImage = { url: string; alt: string; width: number; height: number };

export type ShopVariant = {
  id: string;
  title: string;
  available: boolean;
  price: Money;
};

export type ShopProduct = {
  handle: string;
  title: string;
  description: string;
  image: ShopImage | null;
  /** Lowest variant price, what the card shows. */
  priceFrom: Money;
  available: boolean;
  /** A single unnamed variant means no picker is shown. */
  variants: ShopVariant[];
};

export function shopConfigured(): boolean {
  return Boolean(SHOPIFY_DOMAIN && SHOPIFY_TOKEN);
}

export function storefrontEndpoint(): string {
  return `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
}

export function formatMoney(m: Money): string {
  const n = Number(m.amount);
  if (!Number.isFinite(n)) return `${m.amount} ${m.currencyCode}`;
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: m.currencyCode }).format(n);
  } catch {
    return `${n.toFixed(2)} ${m.currencyCode}`;
  }
}

const CATALOG_QUERY = `
  query Catalog($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      nodes {
        handle
        title
        description
        availableForSale
        featuredImage { url altText width height }
        priceRange { minVariantPrice { amount currencyCode } }
        variants(first: 100) {
          nodes {
            id
            title
            availableForSale
            price { amount currencyCode }
          }
        }
      }
    }
  }
`;

type RawVariant = { id: string; title: string; availableForSale: boolean; price: Money };
type RawProduct = {
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage: { url: string; altText: string | null; width: number; height: number } | null;
  priceRange: { minVariantPrice: Money };
  variants: { nodes: RawVariant[] };
};

function normalize(p: RawProduct): ShopProduct {
  return {
    handle: p.handle,
    title: p.title,
    description: p.description || '',
    image: p.featuredImage
      ? {
          url: p.featuredImage.url,
          alt: p.featuredImage.altText || p.title,
          width: p.featuredImage.width,
          height: p.featuredImage.height,
        }
      : null,
    priceFrom: p.priceRange.minVariantPrice,
    available: p.availableForSale,
    variants: p.variants.nodes.map((v) => ({
      id: v.id,
      title: v.title,
      available: v.availableForSale,
      price: v.price,
    })),
  };
}

let cached: Promise<ShopProduct[]> | null = null;

/**
 * Every product, once per build. A Shopify error fails the build rather than shipping an empty
 * shop quietly: a storefront that silently loses its catalog is worse than one that will not deploy.
 */
export function getCatalog(): Promise<ShopProduct[]> {
  if (!cached) cached = loadCatalog();
  return cached;
}

async function loadCatalog(): Promise<ShopProduct[]> {
  if (!shopConfigured()) return SHOP_DEMO ? DEMO_CATALOG : [];
  const res = await fetch(storefrontEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query: CATALOG_QUERY, variables: { first: 100 } }),
  });
  if (!res.ok) throw new Error(`Shopify Storefront API responded ${res.status} for ${SHOPIFY_DOMAIN}`);
  const json = (await res.json()) as { data?: { products?: { nodes: RawProduct[] } }; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(`Shopify Storefront API: ${json.errors.map((e) => e.message).join('; ')}`);
  const nodes = json.data?.products?.nodes;
  if (!nodes) throw new Error('Shopify Storefront API returned no products field');
  return nodes.map(normalize);
}

export async function getProduct(handle: string): Promise<ShopProduct | null> {
  const all = await getCatalog();
  return all.find((p) => p.handle === handle) || null;
}

const USD = (amount: string): Money => ({ amount, currencyCode: 'USD' });

/**
 * Placeholder catalog, shown only when NEXT_PUBLIC_SHOP_DEMO is "true" and no store is configured.
 * It exists so the shop can be reviewed before Shopify is connected. The titles are obviously
 * stand-ins and there are no product photographs, so nothing here can be mistaken for real stock.
 */
export const DEMO_CATALOG: ShopProduct[] = [
  {
    handle: 'sample-tee',
    title: 'Sample tee',
    description: 'Placeholder product. Replace by connecting a Shopify store.',
    image: null,
    priceFrom: USD('45.00'),
    available: true,
    variants: [
      { id: 'demo-tee-s', title: 'S', available: true, price: USD('45.00') },
      { id: 'demo-tee-m', title: 'M', available: true, price: USD('45.00') },
      { id: 'demo-tee-l', title: 'L', available: false, price: USD('45.00') },
      { id: 'demo-tee-xl', title: 'XL', available: true, price: USD('45.00') },
    ],
  },
  {
    handle: 'sample-hoodie',
    title: 'Sample hoodie',
    description: 'Placeholder product. Replace by connecting a Shopify store.',
    image: null,
    priceFrom: USD('90.00'),
    available: true,
    variants: [
      { id: 'demo-hood-m', title: 'M', available: true, price: USD('90.00') },
      { id: 'demo-hood-l', title: 'L', available: true, price: USD('90.00') },
    ],
  },
  {
    handle: 'sample-cap',
    title: 'Sample cap',
    description: 'Placeholder product. Replace by connecting a Shopify store.',
    image: null,
    priceFrom: USD('35.00'),
    available: false,
    variants: [{ id: 'demo-cap-os', title: 'One size', available: false, price: USD('35.00') }],
  },
];
