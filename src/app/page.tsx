import MainTitle from '@/components/MainTitle/MainTitle';
import PageDescription from '@/components/PageDescription/PageDescription';
import SectionTitle from '@/components/FeaturesSection/SectionTitle/SectionTitle';
import FeatureList from '@/components/FeaturesSection/FeatureList/FeatureList';

const countriesPageFeatures = [
  'Alphabetical list of all countries',
  'Click on a letter to filter countries by first letter',
  'View country flags, population, and continents',
  'Quick link to each country on Google Maps',
  'Sort countries by population interactively',
];

export default function HomePage() {
  return (
    <main>
      <MainTitle>Welcome to the Country Explorer!</MainTitle>
      <PageDescription>
        This application allows you to browse all countries in the world, view
        their capitals, population, flags, continents, and even access their
        location on Google Maps.
      </PageDescription>

      <section>
        <SectionTitle>Countries Page Features</SectionTitle>
        <FeatureList items={countriesPageFeatures} />
      </section>
    </main>
  );
}
