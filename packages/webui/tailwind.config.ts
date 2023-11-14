import type { Config } from 'tailwindcss'
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'spaceImage': "url('/spaceimage.jpeg')",

      },
      colors: {
        'custom_blue': '#5c9dff',
      },
      fontFamily: {

      },
    },
  },
  plugins: [],
} satisfies Config
