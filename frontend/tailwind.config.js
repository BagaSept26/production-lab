/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-utama': '#4F46E5',
        'brand-kedua': '#10B981',
        'kaca-awal': 'rgba(255,255,255,0.25)',
        'kaca-akhir': 'rgba(255,255,255, 0.1)',
      },
      backdropFilter:{
        'none': 'none',
        'blur': 'blur(10px)',
      },
    },
  },
  plugins: [],
}

