'use client';

import { useState } from 'react';
import { CountryResponse } from '@/types/country';
import styles from './CountriesTable.module.css';
import CountryRow from '@/components/pages/CountryRow/CountryRow';
import PageDescription from '@/components/UI/PageDescription/PageDescription';

type CountriesTableProps = {
  countries: CountryResponse[];
  selectedLetter: string | null;
};

export default function CountriesTable({
  countries,
  selectedLetter,
}: CountriesTableProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  const handleSortClick = () => {
    setSortOrder((prev) =>
      prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'
    );
  };

  const displayedCountries =
    sortOrder === null
      ? countries
      : [...countries].sort((a, b) => {
          const popA = a.population ?? 0;
          const popB = b.population ?? 0;
          return sortOrder === 'asc' ? popA - popB : popB - popA;
        });

  return (
    <div className={styles.tableWrapper}>
      <table className={`table ${styles.all_countries_table}`}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Capital</th>
            <th>Flag</th>
            <th
              className={styles.sortColumn}
              onClick={handleSortClick}
              title="Click to sort"
            >
              Population{' '}
              <span className={styles.sortArrow}>
                {sortOrder === 'asc' ? '↑' : sortOrder === 'desc' ? '↓' : '⇅'}
              </span>
            </th>
            <th>Continents</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {displayedCountries.length === 0 ? (
            <tr>
              <td colSpan={7} className={styles.noCountriesMessage}>
                <PageDescription>
                  No countries found
                  {selectedLetter && ` starting with "${selectedLetter}"`}.
                </PageDescription>
              </td>
            </tr>
          ) : (
            displayedCountries.map((c, i) => (
              <CountryRow key={c.name} country={c} index={i} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
