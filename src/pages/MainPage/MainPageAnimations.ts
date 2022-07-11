export const arrowAnimation = {
  trueAnswer: {
    color: '#ffffff',
    x: [0, 40, 0],
    transition: {
      duration: 0.7,
    },
  },
  falseAnswer: {
    color: '#dc143c',
    x: [0, -40, 0],
    transition: {
      duration: 0.5,
    },
  },
  initial: {
    color: '#555555',
    x: 0,
  },
  listIsEmpty: {
    color: '#dc143c',
  },
};

export const wordAnimation = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
      duration: 1,
      type: 'spring',
    },
  },
  up: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.25,
      type: 'spring',
    },
  },
  back: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
      type: 'spring',
    },
  },
  down: {
    y: 50,
    transition: {
      duration: 0.1,
    },
  },
};

export const translationAnimation = {
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  initial: {
    opacity: 0,
  },
};
