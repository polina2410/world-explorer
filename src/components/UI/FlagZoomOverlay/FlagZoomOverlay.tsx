'use client';

import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import Image from 'next/image';
import styles from './FlagZoomOverlay.module.css';
import { SCALE } from '@/animations/animations';

type Props = {
  src: string;
  countryName: string;
  onClose: () => void;
};

export default function FlagZoomOverlay({ src, countryName, onClose }: Props) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <motion.div
      className={`${styles.overlay} flex-center`}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className={styles.wrapper}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: SCALE.ENTER }}
        animate={{ opacity: 1, scale: SCALE.BASIC }}
        exit={{ opacity: 0, scale: SCALE.ENTER }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      >
        <Image
          id="flag-zoomed-image"
          src={src}
          alt={`Zoomed flag of ${countryName}`}
          fill
          sizes="90vw"
          className={styles.image}
        />
      </motion.div>
    </motion.div>,
    document.body
  );
}
