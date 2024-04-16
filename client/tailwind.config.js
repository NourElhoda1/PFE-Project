import { info } from 'autoprefixer';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark': 'black',
        'light': '#f8fafc',
        'primary': '#108a00',
        'secondary': '#13544e',
        'success': '#4ade80',
        'warning': '#be0013',
      }
    },
  },
  plugins: [],
}
