/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4f3',
          100: '#fce7e4',
          200: '#fcd2cc',
          300: '#f9b2a8',
          400: '#f48775',
          500: '#ea5f45',
          600: '#d7442e',
          700: '#b43624',
          800: '#953022',
          900: '#7c2d22',
        },
      },
    },
  },
  plugins: [],
}
