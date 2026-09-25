import type { Metadata } from 'next';
import Link from 'next/link';
import { pageTitle } from '@/lib/site';
import { formatMoney, getCatalog, shopConfigured, SHOP_DEMO } from '@/lib/shop';
import Bag from '@/components/shop/Bag';
import s from './shop.module.css';

export const metadata: Metadata = {
  title: pageTitle('Shop'),
  description: 'Official CultureBowl™ merch. Wear the culture forward.',
};

/*
 * The shop has no artboard, so unlike the event pages it is one responsive tree rather than
 * separate only-d and only-m trees.
 */
export default async function ShopPage() {
  const products = await getCatalog();

  return (
    <section id="shop" className={`page ${s.shop}`}>
      <div className={`wrap ${s.wrap}`}>
        <div className={s.head}>
          <div>
            <p className={`hud ${s.eyebrow}`}>Official merch</p>
            <h1 className={`d ${s.title}`}>Shop</h1>
          </div>
          {products.length > 0 && <Bag />}
        </div>

        {products.length ? (
          <ul className={s.grid}>
            {products.map((p) => (
              <li key={p.handle} className={s.cell}>
                <Link className={s.card} href={`/shop/${p.handle}`}>
                  <span className={s.shot}>
                    {p.image ? (
                      <img
                        className={s.img}
                        src={p.image.url}
                        alt={p.image.alt}
                        width={p.image.width}
                        height={p.image.height}
                        loading="lazy"
                      />
                    ) : (
                      <span aria-hidden="true" className={s.noshot} />
                    )}
                    {!p.available && <span className={`st ${s.tag}`}>Sold out</span>}
                  </span>
                  <span className={`d7 ${s.name}`}>{p.title}</span>
                  <span className={`num ${s.price}`}>{formatMoney(p.priceFrom)}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className={s.empty}>
            <p className={`d8 ${s.emptyHead}`}>The shop is not open yet</p>
            <p className={s.emptyCopy}>
              {shopConfigured()
                ? 'There is nothing in the store right now. Check back soon.'
                : 'Merch drops are on the way. Tap in and we will tell you the moment it lands.'}
            </p>
            <Link className="btn btn-red" href="/tap-in">Tap in</Link>
          </div>
        )}

        {SHOP_DEMO && !shopConfigured() && (
          <p className={s.demo} role="note">
            Demo catalog: NEXT_PUBLIC_SHOP_DEMO is on and no Shopify store is connected. These are
            placeholders, not real stock.
          </p>
        )}
      </div>
    </section>
  );
}
