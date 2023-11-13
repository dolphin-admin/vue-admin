/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      backgroundColor: {
        'default-light': '#FEFEFE',
        'default-dark': '#36393F'
      }
    }
  },
  darkMode: ['class', '[data-theme="dark"]']
}
