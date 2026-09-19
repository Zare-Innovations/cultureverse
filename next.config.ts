import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: { loader: 'custom', loaderFile: './lib/imageLoader.ts' },
  env: {
    // Inlined into server and client bundles alike so the pre-rendered countdown hydrates without a mismatch.
    NEXT_PUBLIC_BUILD_TIME: String(Date.now()),
  },
};

export default nextConfig;
