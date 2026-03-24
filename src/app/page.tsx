import type { Metadata } from 'next';
import HomePageClient from '@/components/features/HomePage/HomePageClient';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Browse flags from every country in the world, filter by continent, and discover geography facts.',
  openGraph: {
    title: 'Countries Explorer',
    description: 'Browse flags from every country in the world, filter by continent, and discover geography facts.',
    url: '/',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}