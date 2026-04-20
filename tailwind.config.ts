import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f0',
          100: '#dceddc',
          200: '#badcba',
          300: '#8ec48e',
          400: '#5da65d',
          500: '#3d8b3d',
          600: '#2d6e2d',
          700: '#265826',
          800: '#214721',
          900: '#1b3a1b',
          950: '#0d1f0d',
        },
        creek: {
          50: '#f0f8ff',
          100: '#dfeef8',
          200: '#b8ddf2',
          300: '#7cc3e8',
          400: '#3aa5da',
          500: '#1a8ac4',
          600: '#0e6da5',
          700: '#0d5886',
          800: '#0f4b6f',
          900: '#123f5d',
          950: '#0c293e',
        },
        amber: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#d4a012',
          600: '#b8860b',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-source)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-overlay': 'linear-gradient(to bottom, rgba(13,31,13,0.7), rgba(13,31,13,0.4), rgba(13,31,13,0.8))',
        'section-fade': 'linear-gradient(to bottom, rgba(13,31,13,0.95), rgba(18,63,93,0.05))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'count-up': 'count-up 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(61,139,61,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(61,139,61,0.6)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
