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
        background: '#0A0A0A',
        primary: '#00E5FF', // Electric Blue
        secondary: '#0A0A0A', // Dark Charcoal
        accent: '#C0C0C0', // Metallic Silver
        'soft-white': '#EAEAEA',
        'electric-blue': '#00E5FF', // Keeping for backward compatibility if needed
        'metallic-silver': '#C0C0C0', // Keeping for backward compatibility
        'dark-charcoal': '#0A0A0A', // Keeping for backward compatibility
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-manrope)', 'var(--font-space-grotesk)', 'sans-serif'], // Added Manrope
      },
      letterSpacing: {
        wide: '0.1em',
        wider: '0.15em',
        widest: '0.2em',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
      },
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}
