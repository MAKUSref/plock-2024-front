/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        primary: "rgba(var(--color-primary), var(--tw-bg-opacity))",
        caption: "var(--color-caption)",
      },
    },
  },
  plugins: [],
};
