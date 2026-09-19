import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: { loader: 'custom', loaderFile: './lib/imageLoader.ts' },
};

export default nextConfig;
