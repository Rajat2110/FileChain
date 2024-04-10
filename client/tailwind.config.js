/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sharp: ["SharpGrotesk", "sans-serif"]
      }
    },
  },
  plugins: [],
}

