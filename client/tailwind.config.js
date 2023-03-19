/** @type {import('tailwindcss').Config} */
const { colors: defaultColors} = require('tailwindcss/colors')

// const colors = {
//   ...defaultColors,
//   ...{
//     "crimson": "#EA4335",
//   }
// }

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
