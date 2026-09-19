import type { Metadata } from 'next';
import { pageTitle } from '@/lib/site';
import { WORLDS } from '@/lib/worlds';
import WorldPage from '@/components/world/WorldPage';

const w = WORLDS.coming;

export const metadata: Metadata = {
  title: pageTitle('CultureComing™'),
  description: w.copy,
};

export default function Page() {
  return <WorldPage w={w} />;
}
