'use client';
import { useSyncExternalStore } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import styles from './ThemeToggle.module.css';
import { MoonIcon, SunIcon } from '@/components/icons/ThemeIcons';
import { SCALE, SPRING_ICON } from '@/animations';

interface Props {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onClick?: () => void;
}

const iconVariants: Variants = {
  initial: (isDark: boolean) => ({
    opacity: 0,
    rotate: isDark ? -90 : 90,
    scale: 0.5,
  }),
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: SPRING_ICON,
  },
  exit: (isDark: boolean) => ({
    opacity: 0,
    rotate: isDark ? 90 : -90,
    scale: 0.5,
    transition: { duration: 0.15, ease: 'easeIn' },
  }),
};

const emptySubscribe = () => () => {};
const useIsClient = () => useSyncExternalStore(emptySubscribe, () => true, () => false);

export default function ThemeToggle({ theme, toggleTheme, onClick }: Props) {
  const isClient = useIsClient();

  const handleClick = () => {
    toggleTheme();
    if (onClick) onClick();
  };

  const isDark = isClient && theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label="Toggle theme"
      className={styles.iconButton}
      whileTap={{ scale: SCALE.PRESS }}
      whileHover={{ scale: SCALE.ACTIVE }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className={styles.iconWrap}
          variants={iconVariants}
          custom={isDark}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
