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
        'primary': '#7b3192',
        'dark-1': 'rgb(48, 49, 52)',
        'dark-2': '#202124',
        'dark-gray': 'rgb(168 174 182)'
      },
      height: {
        'app-root': 'calc(100vh - 64px)',
      },
      backgroundColor: {
        'primary': '#7b3192',
        'dark-1': 'rgb(48, 49, 52)',
        'dark-2': '#202124',
        'dark-gray': 'rgb(168 174 182)'
      },
      borderColor: {
        'custom': 'var(--bs-border-color)', // Custom border color
      },
    },

  },
  plugins: [],
}

