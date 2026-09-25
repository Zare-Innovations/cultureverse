'use client';

import { useId, useState } from 'react';
import { bagTotal, clearBag, createCheckout, setQty, useBag } from '@/lib/cart';
import { formatMoney, shopConfigured } from '@/lib/shop';
import s from './shop.module.css';

/*
 * The bag sits inside the shop pages rather than in the global nav, so the site chrome stays
 * byte for byte what the artboards specify and the nav comparisons keep passing.
 */
export default function Bag() {
  const lines = useBag();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const panelId = useId();

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const total = bagTotal(lines);

  async function checkout() {
    setBusy(true);
    setError('');
    try {
      const url = await createCheckout(lines);
      // A full navigation, not a form post, so form-action stays 'self' in the CSP.
      window.location.assign(url);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Checkout could not be started.');
      setBusy(false);
    }
  }

  return (
    <div className={s.bagWrap}>
      <button
        type="button"
        className={`btn btn-line btn-sm ${s.bagBtn}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        Bag<span className="num"> ({count})</span>
      </button>

      <div id={panelId} className={s.bagPanel} hidden={!open}>
        {!lines.length ? (
          <p className={s.bagEmpty}>Your bag is empty.</p>
        ) : (
          <>
            <ul className={s.bagList}>
              {lines.map((l) => (
                <li key={l.variantId} className={s.bagLine}>
                  <div className={s.bagInfo}>
                    <p className={`d7 ${s.bagName}`}>{l.title}</p>
                    {l.variantTitle && <p className={`hud ${s.bagVariant}`}>{l.variantTitle}</p>}
                    <p className={`num ${s.bagPrice}`}>{formatMoney(l.price)}</p>
                  </div>
                  <div className={s.qty}>
                    <label className="sr-only" htmlFor={`${panelId}-${l.variantId}`}>
                      Quantity of {l.title}
                    </label>
                    <input
                      id={`${panelId}-${l.variantId}`}
                      className={`num ${s.qtyInput}`}
                      type="number"
                      min={0}
                      max={99}
                      value={l.qty}
                      onChange={(e) => setQty(l.variantId, Number(e.target.value))}
                    />
                    <button type="button" className={s.remove} onClick={() => setQty(l.variantId, 0)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className={s.bagFoot}>
              <p className={`d7 ${s.bagTotal}`}>
                Total <span className="num">{total ? formatMoney(total) : ''}</span>
              </p>
              <p className={s.bagNote}>Shipping and tax are calculated at checkout.</p>
              {shopConfigured() ? (
                <button type="button" className="btn btn-red" disabled={busy} onClick={checkout}>
                  {busy ? 'Starting checkout…' : 'Checkout'}
                </button>
              ) : (
                <p className={s.bagNote}>
                  Checkout opens once a Shopify store is connected.
                </p>
              )}
              {error && <p className="form-error" role="alert">{error}</p>}
              <button type="button" className={s.remove} onClick={clearBag}>Empty the bag</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
