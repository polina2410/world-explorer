import type { Metadata } from 'next';
import HomePageClient from '@/components/features/HomePage/HomePageClient';
import { APP_URL } from '@/constants/routes';

export const metadata: Metadata = {
  title: {
    absolute: 'Countries Explorer',
  },
  description:
    'Browse flags from every country in the world, filter by continent, and discover geography facts.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Countries Explorer',
    description:
      'Browse flags from every country in the world, filter by continent, and discover geography facts.',
    url: '/',
    images: [
      {
        url: `${APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Countries Explorer',
      },
    ],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}