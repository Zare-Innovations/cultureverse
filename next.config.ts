import type { NextConfig } from 'next';

/*
 * On Vercel the site runs on the Next.js runtime so the shop pages can refresh themselves from the
 * Squarespace store (lib/shop.ts). STATIC_EXPORT=true writes the old fully static `out/` instead,
 * which the relocatable preview and the verification scripts use.
 */
const STATIC_EXPORT = process.env.STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  ...(STATIC_EXPORT ? { output: 'export' as const } : {}),
  reactStrictMode: true,
  images: { loader: 'custom', loaderFile: './lib/imageLoader.ts' },
};

export default nextConfig;
