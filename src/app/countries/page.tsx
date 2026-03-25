import type { Metadata } from 'next';
import CountriesPageClient from '@/components/features/CountriesPage/CountriesPageClient';
import { APP_URL } from '@/constants/routes';

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
    images: [
      {
        url: `${APP_URL}/og/og-image-default.png`,
        width: 1200,
        height: 630,
        alt: 'Countries Explorer',
      },
    ],
  },
  twitter: {
    title: 'Countries | Countries Explorer',
    description:
      'Browse an alphabetical list of all independent countries with capitals, populations, and more.',
  },
};

export default function CountriesPage() {
  return <CountriesPageClient />;
}
