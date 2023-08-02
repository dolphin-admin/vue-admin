const DEFAULT_FONTS =
  'system-ui, -apple-system, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        default: [DEFAULT_FONTS]
      },
      textColor: {
        muted: '#999999'
      },
      backgroundColor: {
        'light-default': '#F6F6F6',
        'dark-default': '#36393F'
      }
    }
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]']
}
