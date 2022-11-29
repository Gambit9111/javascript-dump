/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          950: '#1B2430',
          850: '#04293A',
          750: '#064663',
        },
        yellow: {
          950: '#ECB365',
        },
      }
    },
  },
  plugins: [],
}