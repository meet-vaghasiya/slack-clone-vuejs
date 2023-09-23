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
      brand: "#3F0E40",
      link: "#36C5F0",
      text: {
        primary: "#FFFFFFB2",
      },
      content: {
        primary: "#1D1C1D",
        secondary: "#616061",
        tag: "#1264A3",
      },
    },

    extend: {},
  },
  plugins: [],
};
