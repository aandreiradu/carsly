/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "default-gray": "#373737",
        "default-yellow": "rgb(253 224 71)",
      },
      fontFamily: {
        kanit: "'Kanit', sans-serif",
      },
      backgroundImage: {
        "landing-1": "url('/landing-1.jpg')",
        "landing-2": "url('/landing-2.jpg')",
      },
    },
  },
  plugins: [],
};
