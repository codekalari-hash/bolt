/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00C853',
          light: '#5DFC8C',
          dark: '#00913D',
        },
        secondary: {
          DEFAULT: '#4FC3F7',
          light: '#8FF5FF',
          dark: '#0093C4',
        },
        accent: {
          DEFAULT: '#FFEB3B',
          light: '#FFFF72',
          dark: '#C8B900',
        },
        success: '#2E7D32',
        warning: '#FB8C00',
        danger: '#D32F2F',
        background: '#FFFFFF',
        card: '#F5F5F5',
        textPrimary: '#212121',
        textMuted: '#757575',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'eco': '0 4px 14px 0 rgba(0, 200, 83, 0.15)',
        'eco-lg': '0 10px 30px 0 rgba(0, 200, 83, 0.2)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
