/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        matte: {
          950: '#0A0A0A',
          900: '#171717',
          800: '#2A2A2A',
        },
        crimson: {
          500: '#D90429',
          600: '#B00020',
        },
        navy: {
          950: '#0B1220',
        },
        slate: {
          950: '#0A0A0A',
          900: '#171717',
          800: '#2A2A2A',
        },
        cyan: {
          500: '#D90429',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
