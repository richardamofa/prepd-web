export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -40,
  },

  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export const fadeRight = {
  hidden: {
    opacity: 0,
    x: 40,
  },

  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export const stagger = {
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};