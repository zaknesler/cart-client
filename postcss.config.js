const join = require('path').join
const tailwind = join(__dirname, 'tailwind.js')

module.exports = {
  plugins: [
    require('tailwindcss')(tailwind),
    require('autoprefixer'),
  ]
}
