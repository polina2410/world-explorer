import type { ReactNode } from 'react';
import '@/styles/globals.css';
import Header from '@/components/Header/Header';
import type { Metadata } from 'next';

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
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
