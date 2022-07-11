export const logoAnimation = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      delay: 0.5,
      duration: 1,
    },
  },
};

export const headerAnimation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.7,
    },
  },
};
