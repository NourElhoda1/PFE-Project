import { info } from 'autoprefixer';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  daisyui: {
    themes: [ ],
  },
  theme: {
    extend: {
      colors: {
        'dark': '#0e0e0e',
        'light': '#f8fafc',
        'primary': '#108a00',
        'secondary': '#13544e',
        'success': '#4ade80',
        'warning': '#be0013',
      }
    },
  },
  plugins: [require("daisyui")],
}

