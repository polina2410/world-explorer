'use client';

import { motion } from 'motion/react';
import { useMemo, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCountries } from '@/context/CountriesContext';
import DataLoader from '@/components/UI/DataLoader/DataLoader';
import { getContinents } from '@/utils/getContinents';
import { FlagMosaicProvider } from '@/context/FlagMosaicContext';
import FlagMosaicGrid from '@/components/features/HomePage/FlagMosaicGrid/FlagMosaicGrid';
import FlagMosaicControls from '@/components/features/HomePage/FlagMosaicControls/FlagMosaicControls';
import { containerVariants, fadeUpVariants } from '@/animations';
import PageDescription from '@/components/UI/PageDescription/PageDescription';

export default function FlagMosaic() {
  const { countries, error } = useCountries();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortOrder = (searchParams.get('sort') as 'asc' | 'desc') ?? 'asc';
  const selectedContinent = searchParams.get('continent') ?? 'All';
  const searchTerm = searchParams.get('search') ?? '';

  const updateParam = useCallback(
    (key: string, value: string, defaultValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === defaultValue) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const query = params.toString();
      router.replace(`${pathname}${query ? `?${query}` : ''}`);
    },
    [router, pathname, searchParams],
  );

  const toggleSortOrder = useCallback(
    () => updateParam('sort', sortOrder === 'asc' ? 'desc' : 'asc', 'asc'),
    [sortOrder, updateParam],
  );

  const setSelectedContinent = useCallback(
    (v: string) => updateParam('continent', v, 'All'),
    [updateParam],
  );

  const setSearchTerm = useCallback(
    (v: string) => updateParam('search', v, ''),
    [updateParam],
  );

  const continents = getContinents(countries);

  const processedCountries = useMemo(() => {
    return [...(countries ?? [])]
      .filter((country) =>
        selectedContinent === 'All'
          ? true
          : country.continents.includes(selectedContinent)
      )
      .filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) =>
        sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
  }, [countries, selectedContinent, searchTerm, sortOrder]);

  return (
    <FlagMosaicProvider>
      <motion.div variants={containerVariants}>
        <motion.div variants={fadeUpVariants}>
          <FlagMosaicControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortOrder={sortOrder}
            toggleSortOrder={toggleSortOrder}
            selectedContinent={selectedContinent}
            setSelectedContinent={setSelectedContinent}
            continents={continents}
          />
        </motion.div>

        <motion.div variants={fadeUpVariants}>
          <DataLoader
            data={countries}
            error={error}
            emptyMessage="No countries available"
          >
            {() =>
              processedCountries.length > 0 ? (
                <FlagMosaicGrid countries={processedCountries} />
              ) : (
                <div className="flex-center page">
                  <PageDescription>
                    No countries match your search. Try again!
                  </PageDescription>
                </div>
              )
            }
          </DataLoader>
        </motion.div>
      </motion.div>
    </FlagMosaicProvider>
  );
}
