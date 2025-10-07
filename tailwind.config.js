/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
   extend: {
  keyframes: {
    fadeIn: {
      "0%": { opacity: 0, transform: "translateY(-10px)" },
      "100%": { opacity: 1, transform: "translateY(0)" },
    },
    slideInLeft: {
      "0%": { transform: "translateX(-100%)" },
      "100%": { transform: "translateX(0)" },
    },
  },
  animation: {
    fadeIn: "fadeIn 0.4s ease-out forwards",
    slideInLeft: "slideInLeft 0.3s ease-out forwards",
  },
},


  },
  plugins: [],
}
