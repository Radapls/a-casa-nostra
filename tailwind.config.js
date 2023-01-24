/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            '4xs': '256px',
            '3xs': '384px',
            '2xs': '512px',
            'xs': '640px',
            ...defaultTheme.screens,
        }
      },
    plugins: [
        require('@tailwindcss/forms'),
    ],
  }