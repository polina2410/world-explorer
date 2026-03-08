import type { ReactNode } from 'react';
import '@/styles/globals.css';
import Header from '@/components/Header/Header';
import type { Metadata } from 'next';
import { CountriesProvider } from '@/hooks/CountriesProvider';

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'CountriesQuiz',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        <CountriesProvider>
          <main id="app-main" className="container">
            {children}
          </main>
        </CountriesProvider>
      </body>
    </html>
  );
}
