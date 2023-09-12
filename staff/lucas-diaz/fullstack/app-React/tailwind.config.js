/** @type {import('tailwindcss').Config} */

import helloworldPlugin from './tailwind.helloworld.plugin'



export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [helloworldPlugin]
}