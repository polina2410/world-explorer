import type { ReactNode } from 'react';
import '@/styles/globals.css';
import Header from '@/components/layout/Header/Header';
import type { Metadata } from 'next';
import { CountriesProvider } from '@/context/CountriesContext';
import { QuizProvider } from '@/context/QuizContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { NavigationGuardProvider } from '@/context/NavigationGuardContext';
import { fetchCountries } from '@/lib/fetchCountries';
import Footer from '@/components/layout/Footer/Footer';
import { APP_URL } from '@/constants/routes';

type RootLayoutProps = {
  children: ReactNode;
};
const TITLE = 'Countries Explorer';
const DESCRIPTION =
  'Explore countries around the world and test your geography knowledge with interactive quizzes.';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: TITLE,
    template: `%s | ${TITLE}`,
  },
  description: DESCRIPTION,
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    siteName: TITLE,
    title: TITLE,
    description: DESCRIPTION,
    url: APP_URL,
    locale: 'en_US',
    images: [
      {
        url: `${APP_URL}/og/og-image-default.png`,
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [`${APP_URL}/og/og-image-default.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: APP_URL,
  },
};

export default async function RootLayout({ children }: RootLayoutProps) {
  let countries: Awaited<ReturnType<typeof fetchCountries>> = [];
  let fetchError: string | null = null;
  try {
    countries = await fetchCountries();
  } catch (e) {
    console.error('Failed to fetch countries:', e);
    fetchError = e instanceof Error ? e.message : 'Failed to load countries';
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}`,
          }}
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=synonym@400&f[]=amulya@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <NavigationGuardProvider>
            <QuizProvider>
              <Header />
              <CountriesProvider
                initialCountries={countries}
                initialError={fetchError}
              >
                <main id="app-main" className="container">
                  {children}
                </main>
              </CountriesProvider>
              <Footer />
            </QuizProvider>
          </NavigationGuardProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
