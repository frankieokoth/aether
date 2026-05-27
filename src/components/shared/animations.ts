export const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

export const detailContainerVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
      opacity: { duration: 0.4, delay: 0.2 },
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

export const detailItemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const } }
};
