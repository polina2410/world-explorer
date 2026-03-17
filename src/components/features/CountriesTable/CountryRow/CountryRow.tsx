'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CountryResponse } from '@/types/country';
import { formatList, formatPopulation } from '@/utils/utils';
import styles from './CountryRow.module.css';
import Tooltip from '@/components/UI/Tooltip/Tooltip';
import { useClickOutside } from '@/hooks/useClickOutside';
import { motion, AnimatePresence } from 'motion/react';
import { rowVariants } from '@/animations';
import FlagZoomOverlay from '@/components/UI/FlagZoomOverlay/FlagZoomOverlay';

type CountryRowProps = {
  country: CountryResponse;
  index: number;
};

const flagImageStyle = { display: 'block', margin: '0 auto' };

export default function CountryRow({ country, index }: CountryRowProps) {
  const [zoomedFlag, setZoomedFlag] = useState<string | null>(null);

  useClickOutside(() => setZoomedFlag(null), { escape: true });

  const countryId = country.name.toLowerCase().replace(/\s/g, '-');

  return (
    <>
      <motion.tr
        id={`country-row-${countryId}`}
        className={styles.countryRow}
        variants={rowVariants}
        layout
        whileHover={{ x: 3 }}
        transition={{ x: { type: 'spring', stiffness: 400, damping: 30 } }}
      >
        <td className={styles.countryIndex}>{index + 1}</td>
        <td className={styles.countryName}>{country.name}</td>
        <td>{country.capital ?? '—'}</td>

        <td>
          {country.flag && (
            <Image
              id={`flag-${countryId}`}
              src={country.flag}
              alt={`${country.name} flag`}
              width={24}
              height={16}
              style={flagImageStyle}
              className={styles.flagImage}
              onClick={(e) => {
                e.stopPropagation();
                setZoomedFlag(country.flag);
              }}
            />
          )}
        </td>

        <td className={styles.countryPopulation}>
          {formatPopulation(country.population ?? 0)}
        </td>

        <td>{formatList(country.continents) ?? '—'}</td>

        <td className={styles.countryMap}>
          {country.mapUrl ? (
            <Tooltip content={`View ${country.name} on the map`}>
              <a
                href={country.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.truncated}
              >
                View on map
              </a>
            </Tooltip>
          ) : (
            '—'
          )}
        </td>
      </motion.tr>

      <AnimatePresence>
        {zoomedFlag && (
          <FlagZoomOverlay
            src={zoomedFlag}
            countryName={country.name}
            onClose={() => setZoomedFlag(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
