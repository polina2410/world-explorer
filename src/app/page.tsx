import type { Metadata } from 'next';
import HomePageClient from '@/components/features/HomePage/HomePageClient';
import { APP_URL } from '@/constants/routes';

export const metadata: Metadata = {
  title: 'Countries Explorer',
  description:
    'Explore countries around the world - search by name, filter by continent, and discover flags, capitals, and populations.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Countries Explorer',
    description:
      'Explore countries around the world - search by name, filter by continent, and discover flags, capitals, and populations.',
    url: '/',
    images: [
      {
        url: `${APP_URL}/og-image-default.png`,
        width: 1200,
        height: 630,
        alt: 'Countries Explorer',
      },
    ],
  },
  twitter: {
    title: 'Countries Explorer',
    description:
      'Explore countries around the world - search by name, filter by continent, and discover flags, capitals, and populations.',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
