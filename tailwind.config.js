/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-hover": "rgb(var(--primary-hover) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        "text-muted": "rgb(var(--text-muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
