const errorPageAnimation = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      type: 'spring',
    },
  },
};

export default errorPageAnimation;
