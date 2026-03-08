import React, { ReactNode } from 'react';
import styles from './PageDescription.module.css';

type PageDescriptionProps = {
  children: ReactNode;
};

export default function PageDescription({ children }: PageDescriptionProps) {
  return <p className={styles.pageDescription}>{children}</p>;
}
