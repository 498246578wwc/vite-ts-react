// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 同步 Ant Design 主色
        primary: {
          DEFAULT: '#1890ff', // light mode
          dark: '#177ddc', // dark mode
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
