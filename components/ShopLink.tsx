import Link from 'next/link';
import type { ReactNode } from 'react';
import { SHOP_IS_EXTERNAL, SHOP_URL } from '@/lib/site';

/**
 * Renders the Shop link as an internal route or, when NEXT_PUBLIC_SHOP_URL names an external
 * store, as a plain anchor. Every Shop link in the chrome goes through here so the two cases
 * cannot drift apart.
 */
export default function ShopLink({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (SHOP_IS_EXTERNAL) {
    return (
      <a className={className} href={SHOP_URL} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={SHOP_URL} onClick={onClick}>
      {children}
    </Link>
  );
}
