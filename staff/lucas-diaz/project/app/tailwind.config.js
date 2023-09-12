/** @type {import('tailwindcss').Config} */

import tailwindCustomAppStylesPlugin from './tailwind.customAppStyles.plugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        image: "url('../image/IsoLink-logo.png')",
      }
    },
  },
  plugins: [tailwindCustomAppStylesPlugin],
}

