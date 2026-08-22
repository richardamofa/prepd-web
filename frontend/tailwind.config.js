/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "0%": {
            backgroundPosition: "-1200px 0",
          },
          "100%": {
            backgroundPosition: "1200px 0",
          },
        },
      },

      animation: {
        shimmer: "shimmer 2.8s ease-in-out infinite",
      },
    },
  },

  plugins: [],
};