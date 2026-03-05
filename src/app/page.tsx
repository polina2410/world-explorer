import MainTitle from '@/components/MainTitle/MainTitle';
import PageDescription from '@/components/PageDescription/PageDescription';
import FlagMosaic from '@/components/FlagMosaic/FlagMosaic';
import SectionTitle from '@/components/FeaturesSection/SectionTitle/SectionTitle';

export default function HomePage() {
  return (
    <main>
      <MainTitle>Welcome to the Country Explorer!</MainTitle>
      <PageDescription>
        This application allows you to browse all countries in the world, view
        their capitals, population, flags, continents, and even access their
        location on Google Maps.
      </PageDescription>
      <SectionTitle>Click to see the country&#39;s name:</SectionTitle>
      <FlagMosaic />
    </main>
  );
}
