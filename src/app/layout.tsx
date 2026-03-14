import type { ReactNode } from 'react';
import '@/styles/globals.css';
import Header from '@/components/Header/Header';
import type { Metadata } from 'next';
import { CountriesProvider } from '@/hooks/CountriesProvider';
import { GameProvider } from '@/context/GameContext';

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'CountriesExplorer',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=synonym@400&f[]=amulya@700&display=swap"
          rel="stylesheet"
        />
        <title>Countries Explorer</title>
      </head>
      <body>
        <GameProvider>
          <Header />
          <CountriesProvider>
            <main id="app-main" className="container">
              {children}
            </main>
          </CountriesProvider>
        </GameProvider>
      </body>
    </html>
  );
}
