import React, { ReactNode } from 'react';
import styles from './MainTitle.module.css';

type MainTitleProps = {
  children: ReactNode;
  id?: string;
};

export default function MainTitle({ children, id }: MainTitleProps) {
  return (
    <h1 id={id} className={styles.title}>
      {children}
    </h1>
  );
}
