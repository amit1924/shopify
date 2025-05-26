/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // ✅ Important for Vite!
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ Your component files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
