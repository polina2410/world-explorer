import type { Metadata } from 'next';
import HomePageClient from '@/components/features/HomePage/HomePageClient';
import { APP_URL } from '@/constants/routes';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    continent?: string;
    search?: string;
    sort?: string;
  }>;
}): Promise<Metadata> {
  const { continent, search, sort } = await searchParams;

  const title = continent
    ? `${continent} | Countries Explorer`
    : 'Countries Explorer';

  const descriptionParts: string[] = [];

  if (continent) descriptionParts.push(`countries in ${continent}`);
  else descriptionParts.push('countries around the world');

  if (search) descriptionParts.push(`matching "${search}"`);
  if (sort === 'desc') descriptionParts.push('sorted descending');

  const description = `Explore ${descriptionParts.join(' ')}`;

  const params = new URLSearchParams();
  if (continent) params.set('continent', continent);
  if (search) params.set('search', search);
  if (sort) params.set('sort', sort);

  const queryString = params.toString();
  const url = queryString ? `${APP_URL}/?${queryString}` : APP_URL;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      images: [
        {
          url: `${APP_URL}/og-image-default.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: `${APP_URL}/og-image-default.png`,
          alt: title,
        },
      ],
    },
  };
}

export default function HomePage() {
  return <HomePageClient />;
}
