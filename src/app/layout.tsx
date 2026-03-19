import type { ReactNode } from 'react';
import '@/styles/globals.css';
import Header from '@/components/layout/Header/Header';
import type { Metadata } from 'next';
import Script from 'next/script';
import { CountriesProvider } from '@/context/CountriesContext';
import { QuizProvider } from '@/context/QuizContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { NavigationGuardProvider } from '@/context/NavigationGuardContext';
import { fetchCountries } from '@/lib/fetchCountries';

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'CountriesExplorer',
  icons: {
    icon: '/favicon.png',
  },
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const countries = await fetchCountries();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=synonym@400&f[]=amulya@700&display=swap"
          rel="stylesheet"
        />
        <title>Countries Explorer</title>
      </head>
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
        >{`try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}`}</Script>
        <ThemeProvider>
          <NavigationGuardProvider>
            <QuizProvider>
              <Header />
              <CountriesProvider initialCountries={countries}>
                <main id="app-main" className="container">
                  {children}
                </main>
              </CountriesProvider>
            </QuizProvider>
          </NavigationGuardProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
