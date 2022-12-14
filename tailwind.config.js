/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#ffc971',
        'sidebarBackground': '#FFB775',
        'activesidebar' : '#81B3FF'
      },
    },
  },
  plugins: [],
}