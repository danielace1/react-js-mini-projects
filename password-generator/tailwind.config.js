/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./**/*.js", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        custom: ["Salsa", "cursive"],
      },
    },
  },
  plugins: [require("tailwindcss/lib/util/flattenColorPalette")],
};
