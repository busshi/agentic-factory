/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#05070D',
        surface: '#0B0F1A',
        surface2: '#111729',
        line: '#1C2440',
        text: '#E9ECF4',
        muted: '#8992AB',
        muted2: '#5C6480',
        blue: {
          DEFAULT: '#3B82F6',
          soft: '#60A5FA',
        },
        violet: {
          DEFAULT: '#A855F7',
          soft: '#C084FC',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(90deg, #3B82F6 0%, #A855F7 100%)',
        'grad-radial': 'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.15), transparent 60%)',
      },
      keyframes: {
        pulseLine: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-24' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        nodeGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        pulseLine: 'pulseLine 1.2s linear infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        nodeGlow: 'nodeGlow 2.4s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}
