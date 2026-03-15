'use client';

import { motion } from 'framer-motion';
import Alphabet from '@/components/pages/Alphabet/Alphabet';
import MainTitle from '@/components/UI/MainTitle/MainTitle';
import CountriesTable from '@/components/pages/CountriesTable/CountriesTable';
import { Country } from '@/utils/generateQuestions';
import { fadeUpVariants, pageVariants } from '@/animations/animations';

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
    <motion.div variants={pageVariants} className="page">
      <motion.div variants={fadeUpVariants}>
        <MainTitle id="countries-page-title">
          Alphabetical list of countries
        </MainTitle>
      </motion.div>

      <motion.div
        variants={fadeUpVariants}
        id="countries-alphabet-filter"
        role="region"
        aria-labelledby="countries-page-title"
      >
        <Alphabet
          onSelectAction={setSelectedLetter}
          aria-label="Filter countries by starting letter"
        />
      </motion.div>

      <motion.div
        variants={fadeUpVariants}
        key={selectedLetter ?? 'all'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        id="countries-table-section"
        role="region"
        aria-labelledby="countries-page-title"
      >
        <CountriesTable countries={countries} selectedLetter={selectedLetter} />
      </motion.div>
    </motion.div>
  );
}
