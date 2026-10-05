import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pageTitle } from '@/lib/site';
import { cdnSrc, cdnSrcSet, formatPrice, getCatalog, getProduct } from '@/lib/shop';
import Gallery from '@/components/shop/Gallery';
import s from './product.module.css';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getCatalog()).map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const p = await getProduct((await params).handle);
  if (!p) return {};
  return {
    title: pageTitle(p.title),
    description: p.description.find((d) => !d.startsWith('•')) || `${p.title}, official CultureBowl™ merch.`,
  };
}

/*
 * One product: the store's photos and description in the site's design, and a Buy button that
 * opens the product on the Squarespace store, where the cart, checkout and Printful live.
 */
export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const p = await getProduct((await params).handle);
  if (!p) notFound();
  // The description in its own order, with runs of bullet lines grouped into one list.
  const blocks: Array<{ type: 'p'; text: string } | { type: 'ul'; items: string[] }> = [];
  for (const d of p.description) {
    if (d.startsWith('•')) {
      const last = blocks[blocks.length - 1];
      if (last && last.type === 'ul') last.items.push(d.slice(1).trim());
      else blocks.push({ type: 'ul', items: [d.slice(1).trim()] });
    } else {
      blocks.push({ type: 'p', text: d });
    }
  }

  return (
    <section id="product" className={`page ${s.product}`}>
      <div className={`wrap ${s.wrap}`}>
        <nav aria-label="Breadcrumb" className={`hud ${s.crumbs}`}>
          <Link href="/shop">Shop</Link>
          <span className={s.sep}>/</span>
          <Link href={`/shop#${p.collection}`}>{p.collectionTitle}</Link>
        </nav>

        <div className={s.grid}>
          <Gallery images={p.images} title={p.title} />

          <div className={s.details}>
            <p className={`hud ${s.eyebrow}`}>{p.collectionTitle}</p>
            <h1 className={`d8 ${s.title}`}>{p.title}</h1>
            <p className={`d7 ${s.price}`}>{formatPrice(p)}</p>

            {p.options.length > 0 && (
              <dl className={s.options}>
                {p.options.map((o) => (
                  <div key={o.name} className={s.option}>
                    <dt className={`hud ${s.optionName}`}>{o.name}</dt>
                    <dd className={s.optionValues}>
                      {o.values.map((v) => <span key={v} className={s.chip}>{v}</span>)}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <div className={s.buy}>
              <a className="btn btn-red" href={p.storeUrl}>Buy on the store</a>
              <p className={s.buyNote}>Pick your {p.options.length ? p.options.map((o) => o.name.toLowerCase()).join(' and ') + ' and ' : ''}check out on our store. Printed to order by Printful.</p>
            </div>

            {blocks.length > 0 && (
              <div className={s.desc}>
                {blocks.map((b, i) =>
                  b.type === 'p' ? (
                    <p key={i}>{b.text}</p>
                  ) : (
                    <ul key={i} className={s.specs}>
                      {b.items.map((t, k) => <li key={k}>{t}</li>)}
                    </ul>
                  ),
                )}
              </div>
            )}
          </div>
        </div>

        <Link href="/shop" className={`hud ${s.back}`}>Back to the shop</Link>
      </div>
    </section>
  );
}
