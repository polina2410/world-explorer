'use client';

import Alphabet from '@/components/Alphabet/Alphabet';
import MainTitle from '@/components/MainTitle/MainTitle';
import CountriesTable from '@/components/CountriesTable/CountriesTable';
import { useEffect, useState } from 'react';
import { CountryResponse } from '@/types/country';

export default function CountriesPage() {
  const [countries, setCountries] = useState<CountryResponse[]>([]);

  useEffect(() => {
    fetch('/api/countries')
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch(console.error);
  }, []);

  const filteredCountries = [...countries]
    // .filter((c) =>
    //   selectedLetter ? c.name.startsWith(selectedLetter) : true
    // )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <MainTitle>Alphabetical list of countries</MainTitle>
      <Alphabet />
      <CountriesTable countries={filteredCountries} />
    </>
  );
}
