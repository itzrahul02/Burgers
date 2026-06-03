/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '0 2px 2px rgba(80, 35, 20, 0.5)', // Custom shadow with your RGB color
      },
    },
  },
  darkMode: 'class', // Enables dark mode using the 'class' strategy
  plugins: [],
}
