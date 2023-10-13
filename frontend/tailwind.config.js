/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'purple': '#7f5af0',
      'green': '#2cb67d',
      'white': '#fffffe',
      'light-gray': '#94a1b2',
      'gray': '#242629',
      'dark-gray': '#16161a',
      'black': '#010101',
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif']

    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

