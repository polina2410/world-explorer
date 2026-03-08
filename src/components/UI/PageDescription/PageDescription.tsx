import React, { ReactNode } from 'react';
import styles from './PageDescription.module.css';

type PageDescriptionProps = {
  children: ReactNode;
  id?: string;
};

export default function PageDescription({
  children,
  id,
}: PageDescriptionProps) {
  return (
    <p id={id} className={styles.pageDescription}>
      {children}
    </p>
  );
}
