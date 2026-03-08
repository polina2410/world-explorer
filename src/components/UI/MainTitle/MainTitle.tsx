import React, { ReactNode } from 'react';
import styles from './MainTitle.module.css';

type MainTitleProps = {
  children: ReactNode;
};

export default function MainTitle({ children }: MainTitleProps) {
  return <h1 className={styles.title}>{children}</h1>;
}
