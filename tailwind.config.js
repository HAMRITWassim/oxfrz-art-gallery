/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        persona: ["PERSONA", "sans-serif"],
        david: ['"David Libre"', "serif"],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        times: ['"Times New Roman"', 'Times', 'serif'],
        bitcount: ['"Bitcount Prop Double"', 'sans-serif'],


      }
    },
  },
  plugins: [],
}

