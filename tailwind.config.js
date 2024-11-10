module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5f6FFF',  // Adds a custom color 'primary' to the theme
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill,minmax(350px,1fr))',  // Adds a responsive grid with min 200px
        'autoD': 'repeat(auto-fill,minmax(150px,1fr))', // Adds a responsive grid with min 150px
      }
    },
  },
  plugins: [],
}
