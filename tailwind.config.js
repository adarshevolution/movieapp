/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'background' : '#093545',
        'input-color':'#224957',
        'primary':"#2BD17E",
        'card-color':'#092C39'
      },
      fontFamily:{
        'mont':'Montserrat'
      }
    },
  },
  plugins: [],
}