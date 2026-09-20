/** Public asset path, made relative when the build is a relocatable preview (the same rule as lib/imageLoader.ts). */
const RELATIVE = process.env.NEXT_PUBLIC_RELATIVE_PREVIEW === 'true';

export const assetUrl = (path: string) => (RELATIVE ? path.replace(/^\//, '') : path);
