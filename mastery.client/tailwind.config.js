// module.exports = {
//     content: [
//       "./src/**/*.{js,jsx,ts,tsx}",
//     ],
//     theme: {
//       extend: {},
//     },
//     plugins: [],
//   }
  module.exports = {
    content: [
        './node_modules/preline/preline.js', "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    plugins: [
        require('preline/plugin'),
    ],
  }