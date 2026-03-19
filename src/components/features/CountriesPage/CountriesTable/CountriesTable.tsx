'use client';

import { useState } from 'react';
import { CountryResponse } from '@/types/country';
import styles from './CountriesTable.module.css';
import CountryRow from '@/components/features/CountriesPage/CountryRow/CountryRow';
import PageDescription from '@/components/UI/PageDescription/PageDescription';
import { motion } from 'motion/react';
import { SPRING_INDICATOR } from '@/animations';
import { COUNTRIES_TABLE_COLUMN_COUNT } from '@/constants';

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

  const ariaSort =
    sortOrder === 'asc'
      ? 'ascending'
      : sortOrder === 'desc'
        ? 'descending'
        : 'none';

  return (
    <div id="countries-table-wrapper" className={styles.tableWrapper}>
      <table id="countries-table" className={`table ${styles.countriesTable}`}>
        <thead id="countries-table-head">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Capital</th>
            <th scope="col">Flag</th>

            <th
              id="countries-table-sort-population"
              className={styles.sortColumn}
              onClick={handleSortClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSortClick();
                }
              }}
              title="Click or press Enter/Space to sort"
              tabIndex={0}
              aria-sort={ariaSort}
            >
              Population{' '}
              <motion.span
                className={styles.sortArrow}
                animate={{
                  rotate: sortOrder === 'desc' ? 180 : 0,
                  opacity: sortOrder ? 1 : 0.4,
                }}
                transition={SPRING_INDICATOR}
              >
                ↑
              </motion.span>
            </th>

            <th scope="col">Regions</th>
            <th scope="col">Link</th>
          </tr>
        </thead>

        <tbody id="countries-table-body">
          {displayedCountries.length === 0 ? (
            <tr id="countries-table-empty">
              <td
                colSpan={COUNTRIES_TABLE_COLUMN_COUNT}
                className={styles.noCountriesMessage}
              >
                <PageDescription>
                  No countries found{' '}
                  {selectedLetter && ` starting with "${selectedLetter}"`}.
                </PageDescription>
              </td>
            </tr>
          ) : (
            displayedCountries.map((country, i) => (
              <CountryRow key={country.name} country={country} index={i} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
