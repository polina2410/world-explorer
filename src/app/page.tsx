import type { Metadata } from 'next';
import HomePageClient from '@/components/features/HomePage/HomePageClient';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Browse flags from every country in the world, filter by continent, and discover geography facts.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: 'Countries Explorer',
    description:
      'Browse flags from every country in the world, filter by continent, and discover geography facts.',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
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
