/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      main: '#101929',
      sub: '#03DBEC',
      gray: '#545454',
    },
    extend: {
      fontFamily: {
        heading: "'Cormorant Infant', serif",
        body: "'Raleway', sans-serif",
      }
    },
  },
  plugins: [],
}