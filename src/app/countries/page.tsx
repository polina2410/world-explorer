import type { Metadata } from 'next';
import CountriesPageClient from '@/components/features/CountriesPage/CountriesPageClient';

export const metadata: Metadata = {
  title: 'Countries',
  description:
    'Browse an alphabetical list of all independent countries with capitals, populations, and more.',
  alternates: {
    canonical: '/countries',
  },
  openGraph: {
    title: 'Countries | Countries Explorer',
    description:
      'Browse an alphabetical list of all independent countries with capitals, populations, and more.',
    url: '/countries',
  },
};

export default function CountriesPage() {
  return <CountriesPageClient />;
}