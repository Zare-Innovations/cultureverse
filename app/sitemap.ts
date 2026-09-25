import type { MetadataRoute } from 'next';
import { ROUTES, SITE_URL } from '@/lib/site';
import { getCatalog } from '@/lib/shop';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const pages = ROUTES.map((route) => ({
    url: `${SITE_URL}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: (route === '/' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));
  // Every product that exists at build time. An unconfigured shop adds nothing.
  const products = (await getCatalog()).map((p) => ({
    url: `${SITE_URL}/shop/${p.handle}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  return [...pages, ...products];
}
