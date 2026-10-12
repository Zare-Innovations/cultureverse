import type { MetadataRoute } from 'next';
import { ROUTES, SHOP_IS_EXTERNAL, SITE_URL } from '@/lib/site';
import { getCatalog } from '@/lib/shop';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  // While the Shop links go to the external store, the unlinked /shop pages stay out of the sitemap.
  const pages = ROUTES.filter((route) => !(SHOP_IS_EXTERNAL && route === '/shop')).map((route) => ({
    url: `${SITE_URL}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: (route === '/' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));
  // Every product that exists at build time.
  const products = (SHOP_IS_EXTERNAL ? [] : await getCatalog()).map((p) => ({
    url: `${SITE_URL}/shop/${p.handle}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  return [...pages, ...products];
}
