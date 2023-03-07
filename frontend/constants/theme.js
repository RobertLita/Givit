const colors = {
  accent: "#DD4470",
  primary: "#EE6A59",
  secondary: "#F9AC67",
  ternary: "#ECE6CD",
  black: "#323643",
  white: "#FFFFFF",
  gray1: "#9DA3B4",
  gray2: "#C5CCD6",
};

const sizes = {
  // container
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  base: 16,
  font: 14,
  radius: 6,
  padding: 25,
  h1: 26,
  h2: 20,
  title: 18,
  medium: 16,
  body: 14,
  small: 12,
};

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

const fonts = {
  h1: {
    fontSize: sizes.h1,
  },
  h2: {
    fontSize: sizes.h2,
  },
  medium: {
    fontSize: sizes.medium,
  },
  title: {
    fontSize: sizes.title,
  },
  body: {
    fontSize: sizes.body,
  },
  small: {
    fontSize: sizes.small,
  },
};

export { colors, fonts, sizes, breakpoints };
