/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        lg: "2rem"
      },
      colors: {
        'dark-1': 'rgb(48, 49, 52)',
        'dark-2': '#202124',
        'dark-gray': 'rgb(189, 193, 198)'
      },
      height: {
        'app-root': 'calc(100vh - 64px)',
      },
    },
    backgroundColor: {
      'dark-1': 'rgb(48, 49, 52)',
      'dark-2': '#202124',
      'dark-gray': 'rgb(189, 193, 198)'
    }
  },
  plugins: [],
}

