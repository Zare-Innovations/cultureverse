import type { Metadata } from 'next';
import Link from 'next/link';
import { pageTitle } from '@/lib/site';
import { cdnSrc, cdnSrcSet, formatPrice, getCollections, SHOP_STORE_URL } from '@/lib/shop';
import s from './shop.module.css';

export const metadata: Metadata = {
  title: pageTitle('Shop'),
  description: 'Official CultureBowl™ merch. Wear the culture forward.',
};

/*
 * The shop has no artboard, so unlike the event pages it is one responsive tree rather than
 * separate only-d and only-m trees. The catalog comes from the Squarespace store at build time
 * (see lib/shop.ts); each card opens the product page here, and buying happens on the store.
 */
export default async function ShopPage() {
  const collections = (await getCollections()).filter((c) => c.products.length > 0);

  return (
    <section id="shop" className={`page ${s.shop}`}>
      <div className={`wrap ${s.wrap}`}>
        <div className={s.head}>
          <div>
            <p className={`hud ${s.eyebrow}`}>Official merch</p>
            <h1 className={`d ${s.title}`}>Wear the culture forward</h1>
          </div>
          <p className={s.lede}>Limited CultureBowl 2026 pieces. Printed to order, shipped to you.</p>
        </div>

        {collections.length ? (
          collections.map((c) => (
            <div key={c.slug} className={s.collection} id={c.slug}>
              <div className={s.collectionHead}>
                <h2 className={`d8 ${s.collectionTitle}`}>{c.title}</h2>
                <span className={`hud ${s.count}`}>{c.products.length} {c.products.length === 1 ? 'piece' : 'pieces'}</span>
              </div>
              <ul className={s.grid}>
                {c.products.map((p) => {
                  const [cover, hover] = p.images;
                  return (
                    <li key={p.handle} className={s.cell}>
                      <Link className={s.card} href={`/shop/${p.handle}`}>
                        <span className={s.shot}>
                          {cover ? (
                            <img className={s.img} src={cdnSrc(cover, 750)} srcSet={cdnSrcSet(cover)} sizes="(min-width: 1024px) 420px, 45vw" alt="" width={cover.width} height={cover.height} loading="lazy" />
                          ) : (
                            <span aria-hidden="true" className={s.noshot} />
                          )}
                          {hover && (
                            <img className={`${s.img} ${s.imgHover}`} src={cdnSrc(hover, 750)} srcSet={cdnSrcSet(hover)} sizes="(min-width: 1024px) 420px, 45vw" alt="" width={hover.width} height={hover.height} loading="lazy" aria-hidden="true" />
                          )}
                          {p.onSale && <span className={`st ${s.tag}`}>Sale</span>}
                        </span>
                        <span className={`d7 ${s.name}`}>{p.title}</span>
                        <span className={`hud ${s.price}`}>{formatPrice(p)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        ) : (
          <div className={s.empty}>
            <p className={`d8 ${s.emptyHead}`}>The shop is not open yet</p>
            <p className={s.emptyCopy}>Merch drops are on the way. Tap in and we will tell you the moment it lands.</p>
            <Link className="btn btn-red" href="/tap-in">Tap in</Link>
          </div>
        )}

        <p className={s.note}>
          Checkout and shipping run on <a href={SHOP_STORE_URL}>our store</a>, printed to order by Printful.
        </p>
      </div>
    </section>
  );
}
