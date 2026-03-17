'use client';

import { createPortal } from 'react-dom';
import Image from 'next/image';
import styles from './FlagZoomOverlay.module.css';

type Props = {
  src: string;
  countryName: string;
  onClose: () => void;
};

export default function FlagZoomOverlay({ src, countryName, onClose }: Props) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className={`${styles.overlay} flex-center`} onClick={onClose}>
      <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
        <Image
          id="flag-zoomed-image"
          src={src}
          alt={`Zoomed flag of ${countryName}`}
          fill
          sizes="90vw"
          className={styles.image}
        />
      </div>
    </div>,
    document.body
  );
}
