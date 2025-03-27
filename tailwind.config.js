/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{astro,html,js,jsx,ts,tsx}",
      "./node_modules/@astrojs/preact/**/*.js"
    ],
    theme: {
      extend: {
        colors: {
          'ui-primary': '#5dd37c',
          'ui-medium': '#7dd084',
          'ui-dark': '#06543d',
          'ui-pink': '#ffc0c3',
          'ui-magenta': '#9e014a',
          'ui-purple': '#be4072',
          'ui-light-green': '#deffe7',
        },
      },
    },
    plugins: [],
  }