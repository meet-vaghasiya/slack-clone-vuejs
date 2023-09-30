/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: ["Lato", "sans-serif"],
    },
    colors: {
      white: "#fff",
      black: "#000",
      brand: { DEFAULT: "var(--brand-color)", dark: "#350D36" },
      link: "#36C5F0",
      text: {
        primary: "#FFFFFFB2",
      },
      content: {
        primary: "#1D1C1D",
        secondary: "#616061",
        tag: "#1264A3",
        label: "#1D1C1D",
      },
      primary: {
        DEFAULT: "var(--brand-color)",
      },
      secondary: {},
      red: {
        error: "#ef0b0b",
      },
      warning: {},
      greeen: {},
      blue: {
        focus: "#78D7DD",
        ring: "#167D8E",
      },
      grey: {
        border: "#1D1C1D",
      },
    },

    extend: {},
  },
  plugins: [],
};
