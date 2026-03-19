'use client';

import Button from '@/components/UI/Button/Button';
import Dropdown from '@/components/UI/Dropdown/Dropdown';
import SearchPanel from '@/components/UI/SearchPanel/SearchPanel';
import styles from './FlagMosaicControls.module.css';
import { motion, AnimatePresence } from 'motion/react';

type Props = {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
  selectedContinent: string;
  setSelectedContinent: (v: string) => void;
  continents: string[];
};

export default function FlagMosaicControls({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  selectedContinent,
  setSelectedContinent,
  continents,
}: Props) {
  return (
    <div
      className={`${styles.controls} flex-center flex-wrap`}
      id="flag-mosaic-controls"
    >
      <SearchPanel
        id="flag-mosaic-search"
        value={searchTerm}
        onChangeAction={setSearchTerm}
      />

      <div className={styles.sortButton}>
        <Button
          id="flag-mosaic-sort"
          onClick={() =>
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }
        >
          <span className={styles.sortValue}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={sortOrder}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {sortOrder === 'asc' ? 'A – Z' : 'Z – A'}
              </motion.span>
            </AnimatePresence>
          </span>
        </Button>
      </div>

      <Dropdown
        id="flag-mosaic-dropdown"
        value={selectedContinent}
        options={['All', ...continents]}
        onChangeAction={setSelectedContinent}
      />
    </div>
  );
}
