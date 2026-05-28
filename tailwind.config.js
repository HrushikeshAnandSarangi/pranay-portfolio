/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#111111",
        surface: "rgba(102, 102, 102, 0.15)",
        surfaceHover: "rgba(102, 102, 102, 0.25)",
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'sans-serif'],
        bebas: ['Bebas Neue', 'Impact', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
