import type { Metadata } from 'next';
import QuizPageClient from '@/components/features/Quiz/QuizPageClient';
import { APP_URL } from '@/constants/routes';

export const metadata: Metadata = {
  title: 'Quiz',
  description:
    'Test your world geography knowledge - guess capitals across different continents.',
  alternates: {
    canonical: '/quiz',
  },
  openGraph: {
    title: 'Quiz | Countries Explorer',
    description:
      'Test your world geography knowledge - guess capitals across different continents.',
    url: '/quiz',
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
    title: 'Quiz | Countries Explorer',
    description:
      'Test your world geography knowledge - guess capitals across different continents.',
  },
};

export default function QuizPage() {
  return <QuizPageClient />;
}
