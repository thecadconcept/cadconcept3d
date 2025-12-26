/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        background: '#050505', // Slightly darker than secondary for deep depth
        foreground: '#EDEDED', // High contrast text

        // Brand Colors
        primary: {
          DEFAULT: '#00E5FF', // Electric Blue
          foreground: '#000000',
          50: '#E0FCFF',
          100: '#B3F8FF',
          200: '#80F2FF',
          300: '#4DEBFF',
          400: '#1AE5FF',
          500: '#00E5FF',
          600: '#00B8CC',
          700: '#008A99',
          800: '#005C66',
          900: '#002E33',
        },
        secondary: {
          DEFAULT: '#0A0A0A', // Dark Charcoal
          foreground: '#FFFFFF',
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A',
          950: '#0A0A0A',
        },
        accent: {
          DEFAULT: '#C0C0C0', // Metallic Silver
          foreground: '#000000',
        },

        // Semantic Colors
        success: {
          DEFAULT: '#10B981',
          foreground: '#FFFFFF',
        },
        warning: {
          DEFAULT: '#F59E0B',
          foreground: '#000000',
        },
        error: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        info: {
          DEFAULT: '#3B82F6',
          foreground: '#FFFFFF',
        },

        muted: {
          DEFAULT: '#999999',
          foreground: '#0A0A0A',
        },
        border: '#333333',

        // Surface Colors (for cards, modals, etc)
        surface: {
          50: '#121212',
          100: '#1E1E1E',
          200: '#2A2A2A',
          300: '#3F3F3F',
        },

        // Legacy compatibility (to be refactored)
        'soft-white': '#EAEAEA',
        'electric-blue': '#00E5FF',
        'metallic-silver': '#C0C0C0',
        'dark-charcoal': '#0A0A0A',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-manrope)', 'var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-space-grotesk)', 'monospace'],
      },
      fontSize: {
        '2xs': '0.625rem', // 10px
      },
      letterSpacing: {
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { opacity: '0.5', boxShadow: '0 0 10px rgba(0, 229, 255, 0.2)' },
          '100%': { opacity: '1', boxShadow: '0 0 25px rgba(0, 229, 255, 0.6)' },
        },
      },
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 229, 255, 0.3)',
        'glow-strong': '0 0 40px rgba(0, 229, 255, 0.5)',
      }
    },
  },
  plugins: [],
}
