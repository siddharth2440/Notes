/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/layouts/*.ejs','./views/*.ejs','./views/partials/*.ejs','./views/dashBoard/*.ejs'],
  theme: {
    extend: {
      fontFamily:{
        font:["Unbounded", "sans-serif"]
      }
    },
  },
  plugins: [],
}