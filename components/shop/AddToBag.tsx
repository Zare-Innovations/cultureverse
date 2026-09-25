'use client';

import { useState } from 'react';
import { addLine } from '@/lib/cart';
import { formatMoney, type ShopProduct } from '@/lib/shop';
import s from './shop.module.css';

/** A single variant Shopify calls "Default Title" is the product itself, so it gets no picker. */
function hasRealVariants(p: ShopProduct): boolean {
  return p.variants.length > 1 || (p.variants.length === 1 && p.variants[0].title !== 'Default Title');
}

export default function AddToBag({ product }: { product: ShopProduct }) {
  const variants = product.variants;
  const showPicker = hasRealVariants(product) && variants.length > 1;
  const firstAvailable = variants.findIndex((v) => v.available);
  const [sel, setSel] = useState(firstAvailable === -1 ? 0 : firstAvailable);
  const [added, setAdded] = useState(false);

  const variant = variants[sel];
  const soldOut = !variant || !variant.available;

  if (!variants.length) return <p className={s.sold}>Not available</p>;

  return (
    <div className={s.buy}>
      {showPicker && (
        <fieldset className={s.sizes}>
          <legend className={`lbl ${s.sizesLegend}`}>Size</legend>
          <div className={s.sizeRow}>
            {variants.map((v, i) => (
              <button
                key={v.id}
                type="button"
                className={`tog ${s.size} ${i === sel ? 'on' : ''}`}
                aria-pressed={i === sel}
                disabled={!v.available}
                onClick={() => { setSel(i); setAdded(false); }}
              >
                {v.title}
                {!v.available && <span className={s.sizeOut}> sold out</span>}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <button
        type="button"
        className="btn btn-red"
        disabled={soldOut}
        onClick={() => {
          addLine({
            variantId: variant.id,
            handle: product.handle,
            title: product.title,
            variantTitle: showPicker ? variant.title : '',
            price: variant.price,
          });
          setAdded(true);
        }}
      >
        {soldOut ? 'Sold out' : `Add to bag — ${formatMoney(variant.price)}`}
      </button>

      {/* Announced rather than shown as a transient toast: the bag panel is the real confirmation. */}
      <p className={s.added} role="status">{added && !soldOut ? 'Added to your bag.' : ''}</p>
    </div>
  );
}
