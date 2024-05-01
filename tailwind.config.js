/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1f1d2b",
        orange: "#ea7c69",
        red: "#ff7ca3",
        grey: "#2d303e",
      },
    },
  },
  plugins: [require("rippleui")],
}