import type { Metadata } from 'next';
import QuizPageClient from '@/components/features/Quiz/QuizPageClient';

export const metadata: Metadata = {
  title: 'Quiz',
  description: 'Test your world geography knowledge — guess capitals, countries, and more across different continents.',
  openGraph: {
    title: 'Geography Quiz | Countries Explorer',
    description: 'Test your world geography knowledge — guess capitals, countries, and more across different continents.',
    url: '/quiz',
  },
};

export default function QuizPage() {
  return <QuizPageClient />;
}
