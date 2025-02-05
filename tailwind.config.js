// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004cffeb', // light mode
          dark: '#4f39f6', // dark mode
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
