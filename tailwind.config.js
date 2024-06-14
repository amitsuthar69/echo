/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "light-blue-100": "#F8F6E3",
        "light-blue-200": "#97E7E1",
        "light-blue-300": "#6AD4DD",
        "light-blue-400": "#7AA2E3",
        "dark-blue-100": "#BBE1FA",
        "dark-blue-200": "#3282B8",
        "dark-blue-300": "#0F4C75",
        "dark-blue-400": "#1B262C",
      },
    },
  },
  plugins: [],
};
