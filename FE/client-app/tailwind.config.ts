import type { Config } from 'tailwindcss'

const config: Config = {
  prefix: 'dk-',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
export default config
