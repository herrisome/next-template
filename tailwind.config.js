/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['HarmonyOS Sans', 'Helvetica', 'Arial', 'sans-serif'],
      code: ['Fira Code', 'Helvetica', 'Arial', 'sans-serif'],
      kai: ['楷体-简', '楷体', 'Helvetica', 'Arial', 'sans-serif'],
      MacCao: ['Liu Jian Mao Cao'],
    },
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
