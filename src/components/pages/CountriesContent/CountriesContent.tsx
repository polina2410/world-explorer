'use client';

import Alphabet from '@/components/pages/Alphabet/Alphabet';
import MainTitle from '@/components/UI/MainTitle/MainTitle';
import CountriesTable from '@/components/pages/CountriesTable/CountriesTable';
import { Country } from '@/utils/generateQuestions';

type Props = {
  countries: Country[];
  selectedLetter: string | null;
  setSelectedLetter: (letter: string | null) => void;
};

export default function CountriesContent({
  countries,
  selectedLetter,
  setSelectedLetter,
}: Props) {
  return (
    <div className="container page">
      <MainTitle id="countries-page-title">
        Alphabetical list of countries
      </MainTitle>

      <div
        id="countries-alphabet-filter"
        role="region"
        aria-labelledby="countries-page-title"
      >
        <Alphabet
          onSelectAction={setSelectedLetter}
          aria-label="Filter countries by starting letter"
        />
      </div>

      <div
        id="countries-table-section"
        role="region"
        aria-labelledby="countries-page-title"
      >
        <CountriesTable countries={countries} selectedLetter={selectedLetter} />
      </div>
    </div>
  );
}
