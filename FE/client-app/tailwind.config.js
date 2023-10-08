/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'dk-',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "Inter" :["Inter","sans-serif"],
        "IBM":["IBM Plex Serif", "serif"],
        "Roboto":["Roboto","sans-serif"],
        "Noto":["Noto Serif","serif"],
        Merriweather: ["Merriweather"],
        Montserrat: ["Montserrat","serif"]
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      color: {
        brand: '#003C71'
      }
    },
  },
  plugins: [],
}