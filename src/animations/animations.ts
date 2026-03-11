export const basicVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: custom },
  }),
};
