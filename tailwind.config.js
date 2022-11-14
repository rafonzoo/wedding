const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./client/components/**/*.{js,ts,jsx,tsx}",
    "./client/compounds/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        def: ['17px', '24px'],
        '3xl': ['30px', '34px']
      },
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}
