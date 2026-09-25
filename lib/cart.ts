'use client';

import { useSyncExternalStore } from 'react';
import { SHOPIFY_TOKEN, shopConfigured, storefrontEndpoint, type Money } from './shop';

/*
 * The bag lives in this browser only: there is no server to keep it on. Shopify owns the
 * checkout, so the bag holds just enough to render itself and to name the variants when the
 * shopper leaves for Shopify's hosted checkout.
 */

export type BagLine = {
  variantId: string;
  handle: string;
  title: string;
  /** Empty when the product has a single unnamed variant. */
  variantTitle: string;
  price: Money;
  qty: number;
};

const KEY = 'cb-bag-v1';

let lines: BagLine[] = [];
let loaded = false;
const listeners = new Set<() => void>();
/** The static HTML is built without a bag, so the server snapshot has to be a stable empty one. */
const SERVER_LINES: BagLine[] = [];

function read(): BagLine[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Anything written by an older build, or edited by hand, is discarded rather than trusted.
    return parsed.filter(
      (l): l is BagLine =>
        !!l && typeof l === 'object' &&
        typeof (l as BagLine).variantId === 'string' &&
        typeof (l as BagLine).handle === 'string' &&
        typeof (l as BagLine).title === 'string' &&
        typeof (l as BagLine).qty === 'number' &&
        (l as BagLine).qty > 0 &&
        !!(l as BagLine).price &&
        typeof (l as BagLine).price.amount === 'string',
    );
  } catch {
    return [];
  }
}

function write() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    // Private windows and blocked site data: the bag still works for this page view.
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  if (!loaded) {
    lines = read();
    loaded = true;
  }
  listeners.add(cb);
  // Another tab of the same shop shares the bag.
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      lines = read();
      emit();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', onStorage);
  };
}

function getSnapshot(): BagLine[] {
  if (!loaded) {
    lines = read();
    loaded = true;
  }
  return lines;
}

function getServerSnapshot(): BagLine[] {
  return SERVER_LINES;
}

export function useBag(): BagLine[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useBagCount(): number {
  return useBag().reduce((n, l) => n + l.qty, 0);
}

export function bagTotal(ls: BagLine[]): Money | null {
  if (!ls.length) return null;
  const total = ls.reduce((sum, l) => sum + Number(l.price.amount) * l.qty, 0);
  return { amount: total.toFixed(2), currencyCode: ls[0].price.currencyCode };
}

export function addLine(line: Omit<BagLine, 'qty'>, qty = 1) {
  const at = lines.findIndex((l) => l.variantId === line.variantId);
  lines = at === -1
    ? [...lines, { ...line, qty }]
    : lines.map((l, i) => (i === at ? { ...l, qty: l.qty + qty } : l));
  write();
  emit();
}

export function setQty(variantId: string, qty: number) {
  lines = qty <= 0
    ? lines.filter((l) => l.variantId !== variantId)
    : lines.map((l) => (l.variantId === variantId ? { ...l, qty } : l));
  write();
  emit();
}

export function clearBag() {
  lines = [];
  write();
  emit();
}

const CART_CREATE = `
  mutation BagToCheckout($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { checkoutUrl }
      userErrors { message }
    }
  }
`;

/**
 * Hands the bag to Shopify and returns the hosted checkout URL. Payment, tax and shipping are
 * Shopify's from that point on, which is what keeps this site a static export and out of PCI scope.
 */
export async function createCheckout(ls: BagLine[]): Promise<string> {
  if (!shopConfigured()) throw new Error('No Shopify store is configured');
  if (!ls.length) throw new Error('The bag is empty');
  const res = await fetch(storefrontEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
    },
    body: JSON.stringify({
      query: CART_CREATE,
      variables: { lines: ls.map((l) => ({ merchandiseId: l.variantId, quantity: l.qty })) },
    }),
  });
  if (!res.ok) throw new Error(`Shopify responded ${res.status}`);
  const json = (await res.json()) as {
    data?: { cartCreate?: { cart?: { checkoutUrl?: string }; userErrors?: { message: string }[] } };
    errors?: { message: string }[];
  };
  const errs = [...(json.errors || []), ...(json.data?.cartCreate?.userErrors || [])];
  if (errs.length) throw new Error(errs.map((e) => e.message).join('; '));
  const url = json.data?.cartCreate?.cart?.checkoutUrl;
  if (!url) throw new Error('Shopify returned no checkout URL');
  return url;
}
