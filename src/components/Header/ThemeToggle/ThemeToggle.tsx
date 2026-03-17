'use client';
import { motion } from 'motion/react';
import styles from './ThemeToggle.module.css';
import { MoonIcon, SunIcon } from '@/components/icons/ThemeIcons';
import { SCALE } from '@/animations/animations';

interface Props {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onClick?: () => void;
}

export default function ThemeToggle({ theme, toggleTheme, onClick }: Props) {
  const handleClick = () => {
    toggleTheme();
    if (onClick) onClick();
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label="Toggle theme"
      className={styles.iconButton}
      whileTap={{ scale: SCALE.PRESS }}
      whileHover={{ scale: SCALE.HOVER }}
      transition={{ bounceDamping: 10, bounceStiffness: 600 }}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </motion.button>
  );
}
