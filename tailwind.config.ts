import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0f0f0f',
        accent: '#d4af37'
      },
      boxShadow: {
        premium: '0 10px 30px rgba(212, 175, 55, 0.18)'
      }
    }
  },
  plugins: []
};

export default config;
