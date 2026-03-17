'use client';

import { motion, HTMLMotionProps } from 'motion/react';
import React from 'react';
import styles from './Button.module.css';
import { SCALE } from '@/animations';

type ButtonVariant = 'confirm' | 'default' | 'start' | 'success' | 'danger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

type ButtonProps = HTMLMotionProps<'button'> & {
  children: React.ReactNode;
  active?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function Button({
  children,
  active = false,
  variant = 'default',
  size = 'sm',
  ...props
}: ButtonProps) {
  return (
    <motion.button
      aria-pressed={active || undefined}
      whileTap={{ scale: SCALE.PRESS }}
      whileHover={{ scale: SCALE.HOVER }}
      transition={{ bounceDamping: 10, bounceStiffness: 600 }}
      className={[
        styles.button,
        active && styles.active,
        variant !== 'default' ? styles[variant] : '',
        styles[size],
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </motion.button>
  );
}
