/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'white': '0 2px 4px -1px rgba(252, 252, 252, 0.1), 0 1px 2px -1px rgba(252, 252, 252, 0.06)'
      }
    },
  },
  plugins: [],
}