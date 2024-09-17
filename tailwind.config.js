/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "gray-800": "#343541",
        "gray-700": "#40414f",
        "purple-500": "#9859b7",
        "green-500": "#19c37d",
      },
    },
  },
  plugins: [],
};
