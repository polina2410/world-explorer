import React, { ReactNode } from 'react';
import styles from './SecondaryTitle.module.css';

type SecondaryTitleProps = {
  children: ReactNode;
  id?: string;
};

export default function SecondaryTitle({ children, id }: SecondaryTitleProps) {
  return (
    <h3 id={id} className={styles.secondaryTitle}>
      {children}
    </h3>
  );
}
