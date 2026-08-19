import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pureWhite: '#FFFFFF',
        pearlBg: '#F8FAFC',
        pearlSecondary: '#F1F5F9',
        cardWhite: 'rgba(255, 255, 255, 0.85)',
        textDark: '#0F172A',
        textMuted: '#475569',

        // Cyan Palette with DEFAULT and numeric shades
        cyan: {
          DEFAULT: '#00B4D8',
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#00B4D8',
          600: '#0096c7',
          700: '#0077b6',
          800: '#023e8a',
          900: '#03045e',
          950: '#020617',
        },
        cyanBright: '#00E5FF',

        // Emerald Palette
        emerald: {
          DEFAULT: '#059669',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        emeraldBright: '#10B981',

        // Purple Palette
        purple: {
          DEFAULT: '#7C3AED',
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7C3AED',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },

        // Indigo Palette
        indigo: {
          DEFAULT: '#4F46E5',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4F46E5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
      fontFamily: {
        display: ['var(--font-space)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'bright-glow': '0 20px 50px rgba(0, 180, 216, 0.25)',
        'pearl-shadow': '0 10px 30px -5px rgba(15, 23, 42, 0.08)',
        'glass-glow': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
