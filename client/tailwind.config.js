// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      green: colors.green,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      sky: colors.sky,
      cyan: colors.cyan,
      emerald: colors.emerald,
      teal: colors.teal,
      pink: colors.pink,
      blue: colors.blue,
      orange: colors.orange,
      bgColor: "#F8F8F8",
      purple: "#9736BB",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
