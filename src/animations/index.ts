import { Variants, Transition } from 'motion/react';

export const SCALE = {
  PRESS: 0.92,
  ENTER: 0.95,
  BASIC: 1,
  HOVER: 1.1,
  HOVER_LG: 1.15,
  ACTIVE: 1.2,
} as const;

// Spring transition presets
export const SPRING_INTERACTIVE: Transition = { type: 'spring', stiffness: 400, damping: 20 };
export const SPRING_CARD: Transition = { type: 'spring', stiffness: 380, damping: 20 };
export const SPRING_OVERLAY: Transition = { type: 'spring', stiffness: 320, damping: 26 };
export const SPRING_ICON: Transition = { type: 'spring', stiffness: 260, damping: 18 };
export const SPRING_INDICATOR: Transition = { type: 'spring', stiffness: 300, damping: 22 };
export const SPRING_LAYOUT: Transition = { type: 'spring', stiffness: 120, damping: 22 };

// Eased transition presets
export const TRANSITION_OVERLAY: Transition = { duration: 0.2 };
export const TRANSITION_POPUP: Transition = { duration: 0.15 };

// Card entrance stagger
export const CARD_STAGGER_INCREMENT = 0.012;
export const CARD_STAGGER_MAX_DELAY = 0.5;

export const exitFadeUp = { opacity: 0, y: -10, transition: { duration: 0.2 } } as const;

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: SCALE.ENTER },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.01 },
  },
};

export const gridVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
      staggerChildren: 0.008,
    },
  },
};

export const pageVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

export const tableBodyVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.012,
    },
  },
};

export const rowVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};
