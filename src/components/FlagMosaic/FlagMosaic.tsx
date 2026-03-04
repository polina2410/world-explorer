'use client';

import { useState, useRef, useEffect } from 'react';
import { useCountries } from '@/hooks/CountriesProvider';
import Loading from '@/components/Loading/Loading';
import Image from 'next/image';
import styles from './FlagMosaic.module.css';

export default function FlagMosaic() {
  const { countries, loading, error } = useCountries();

  const [flipped, setFlipped] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const closeCard = () => {
    setFlipped(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleClick = (name: string) => {
    if (flipped === name) {
      closeCard();
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setFlipped(name);

    timeoutRef.current = setTimeout(() => {
      setFlipped(null);
    }, 2500);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        closeCard();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCard();
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [flipped]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;
  if (!countries) return <p>No countries available</p>;

  return (
    <div ref={containerRef} className={styles.mosaicContainer}>
      {countries.map((country) => {
        const isFlipped = flipped === country.name;
        const isDimmed = flipped && flipped !== country.name;

        return (
          <div
            key={country.name}
            className={`${styles.flagCard} 
              ${isFlipped ? styles.active : ''} 
              ${isDimmed ? styles.dimmed : ''}`}
            onClick={() => handleClick(country.name)}
          >
            <div
              className={`${styles.flagInner} ${
                isFlipped ? styles.flipped : ''
              }`}
            >
              <div className={styles.flagFront}>
                <Image
                  src={country.flag}
                  alt={country.name}
                  width={90}
                  height={60}
                  className={styles.flagImage}
                />
              </div>

              <div className={`${styles.flagBack} flex-center`}>
                {country.name}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
