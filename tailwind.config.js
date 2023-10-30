/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  options: {
    safelist: ["blue", "green", "error", "secondary", "brand"],
  },
  theme: {
    fontFamily: {
      primary: ["Lato", "sans-serif"],
    },
    colors: {
      white: "#fff",
      black: "#000",
      brand: { DEFAULT: "var(--brand-color)", dark: "#350D36" },
      link: "#36C5F0",
      transparent: "transparent",
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
      secondary: {
        DEFAULT: "#454447",
      },
      red: {
        error: "#ef0b0b",
      },
      warning: {},
      green: {
        DEFAULT: "#148567",
      },
      blue: {
        focus: "#78D7DD",
        ring: "#167D8E",
        DEFAULT: "#1164A3",
      },
      grey: {
        border: "#1D1C1D",
        icon: "#aaa",
        disabled: "#45444738",
        light: "#F8F8F8",
      },
    },

    extend: {
      rotate: {
        30: "30deg",
        60: "60deg",
        90: "90deg",
        120: "120deg",
        150: "150deg",
        180: "180deg",
        210: "210deg",
        240: "240deg",
        270: "270deg",
        300: "300deg",
        330: "330deg",
        360: "360deg",
      },
    },
  },
  plugins: [],
};
