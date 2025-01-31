/** @type {import('tailwindcss').Config} */
export default {
  content: ["./components/*.jsx"],
  theme: {
    extend: {
      animation: {circle: "circle 1s linear infinite"},
      keyframes: {
        circle: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      }
    },
  },
  plugins: [],
}

