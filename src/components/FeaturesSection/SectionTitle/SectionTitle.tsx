import React, { ReactNode } from 'react';
import styles from './SectionTitle.module.css';

type SectionTitleProps = {
  children: ReactNode;
};

export default function SectionTitle({ children }: SectionTitleProps) {
  return <h2 className={styles.title}>{children}</h2>;
}
