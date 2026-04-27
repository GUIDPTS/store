/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, // Avoid conflicts with MarketPro/Bootstrap base styles
  },
  theme: {
    extend: {
      colors: {
        main: { DEFAULT:'#299e60', 50:'#e7f9ef', 100:'#cef2df', 200:'#b6eccf', 300:'#9ee6bf', 400:'#85e0af', 500:'#6dd9a0', 600:'#299e60', 700:'#258e56', 800:'#207e4c', 900:'#1c6d42' },
        danger: { 50:'#FEF2F2', 100:'#FEE2E2', 600:'#DC2626', 700:'#B91C1C' },
        warning: { 50:'#FEFCE8', 600:'#FF9F29', 700:'#f39016' },
        success: { 50:'#F0FDF4', 600:'#27AE60', 700:'#15803D' },
      },
    },
  },
  plugins: [],
}

