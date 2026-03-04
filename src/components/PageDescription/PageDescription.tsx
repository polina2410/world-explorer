import React, { ReactNode } from 'react';
import styles from './PageDescription.module.css';

type SecondaryTitleProps = {
  children: ReactNode;
};

export default function PageDescription({ children }: SecondaryTitleProps) {
  return <h1 className={styles.title}>{children}</h1>;
}
