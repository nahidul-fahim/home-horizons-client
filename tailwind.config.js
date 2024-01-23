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
      main: '#122620',
      sub: '#D6AD60',
      gray: '#545454',
    },
    extend: {
      fontFamily: {
        heading: "'Cormorant Infant', serif",
        body: "'Montserrat', sans-serif",
      }
    },
  },
  plugins: [require("daisyui")],
}