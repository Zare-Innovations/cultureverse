import type { Metadata } from 'next';
import Link from 'next/link';
import { pageTitle, SITE_URL } from '@/lib/site';
import { formatMoney, getCatalog, getProduct } from '@/lib/shop';
import AddToBag from '@/components/shop/AddToBag';
import Bag from '@/components/shop/Bag';
import s from './product.module.css';

/** Static export: every product page is generated from the build-time catalog, and nothing else resolves. */
export const dynamicParams = false;

/**
 * `output: 'export'` refuses a dynamic route that generates no pages at all, and the site has to
 * build with no store connected. So an empty catalog emits this one page instead: nothing links to
 * it, the sitemap leaves it out and it asks not to be indexed.
 */
const CLOSED = 'unavailable';

export async function generateStaticParams() {
  const products = await getCatalog();
  return products.length ? products.map((p) => ({ handle: p.handle })) : [{ handle: CLOSED }];
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: pageTitle('Shop'), robots: { index: false, follow: false } };
  const description = product.description.slice(0, 200) || `${product.title}, official CultureBowl™ merch.`;
  return {
    title: pageTitle(product.title),
    description,
    openGraph: product.image ? { images: [{ url: product.image.url, alt: product.image.alt }] } : undefined,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  // Only the closed-shop placeholder above has no product: dynamicParams is false, so every other
  // generated handle came from the catalog.
  if (!product) {
    return (
      <section id="product" className={`page ${s.product}`}>
        <div className={`wrap ${s.wrap}`}>
          <div className={s.top}>
            <Link href="/shop" className={`hud ${s.back}`}>Back to the shop</Link>
          </div>
          <h1 className={`d ${s.title}`}>Not available</h1>
          <p className={s.copy}>This product is not in the shop.</p>
        </div>
      </section>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    url: `${SITE_URL}/shop/${product.handle}`,
    ...(product.image ? { image: product.image.url } : {}),
    brand: { '@type': 'Brand', name: 'CultureBowl™' },
    offers: {
      '@type': 'Offer',
      price: product.priceFrom.amount,
      priceCurrency: product.priceFrom.currencyCode,
      availability: product.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${SITE_URL}/shop/${product.handle}`,
    },
  };

  return (
    <section id="product" className={`page ${s.product}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={`wrap ${s.wrap}`}>
        <div className={s.top}>
          <Link href="/shop" className={`hud ${s.back}`}>Back to the shop</Link>
          <Bag />
        </div>

        <div className={s.cols}>
          <div className={s.shot}>
            {product.image ? (
              <img
                className={s.img}
                src={product.image.url}
                alt={product.image.alt}
                width={product.image.width}
                height={product.image.height}
              />
            ) : (
              <span aria-hidden="true" className={s.noshot} />
            )}
          </div>

          <div className={s.detail}>
            <h1 className={`d ${s.title}`}>{product.title}</h1>
            <p className={`num ${s.price}`}>{formatMoney(product.priceFrom)}</p>
            {!product.available && <p className={`st ${s.tag}`}>Sold out</p>}
            {product.description && <p className={s.copy}>{product.description}</p>}
            <AddToBag product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
