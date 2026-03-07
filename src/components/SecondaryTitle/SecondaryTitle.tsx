import React, { ReactNode } from 'react';
import styles from './SecondaryTitle.module.css';

type SecondaryTitleProps = {
  children: ReactNode;
};

export default function SecondaryTitle({ children }: SecondaryTitleProps) {
  return <h3 className={styles.title}>{children}</h3>;
}
