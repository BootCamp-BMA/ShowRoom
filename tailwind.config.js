module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        porsche: ['"Porsche Next"', 'sans-serif'],
      },
      colors: {
        'primary': '#171719',  // Adds a custom color 'primary' to the theme
        'light-gray': '#F1F1F1',
        'medium-gray': '#b5b5b3',
        'dark-gray': '#4c4b4b',
        'almost-black': '#171719',
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill,minmax(350px,1fr))',  // Adds a responsive grid with min 200px
        'autoD': 'repeat(auto-fill,minmax(150px,1fr))', // Adds a responsive grid with min 150px
      }
    },
  },
  plugins: [],
}

