/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Values live as CSS custom properties in src/index.css (light
        // palette on :root, dark overrides under prefers-color-scheme),
        // so the whole site retints automatically with the OS setting —
        // components never reference a hex value directly. The
        // rgb(var(--x) / <alpha-value>) form keeps opacity modifiers
        // (bg-surface2/40, border-line/70, ...) working.
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        surface2: 'rgb(var(--color-surface2) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        muted2: 'rgb(var(--color-muted2) / <alpha-value>)',
        blue: {
          DEFAULT: 'rgb(var(--color-blue) / <alpha-value>)',
          soft: 'rgb(var(--color-blue-soft) / <alpha-value>)',
        },
        violet: {
          DEFAULT: 'rgb(var(--color-violet) / <alpha-value>)',
          soft: 'rgb(var(--color-violet-soft) / <alpha-value>)',
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
        // Gentle continuous 3D wobble for elements inside the use-case
        // Scene* illustrations (the agent chip, key cards). Needs
        // transform-box:fill-box + transform-origin:center on the target
        // (set per-usage, since Tailwind has no utility for transform-box)
        // so it rotates around its own center rather than the SVG's
        // origin — see scenes/README notes in the components for why the
        // rotation lives on a separate inner <g>, not the same one that
        // already carries a positional translate() attribute.
        tilt3d: {
          '0%, 100%': { transform: 'perspective(400px) rotateY(-14deg) rotateX(5deg)' },
          '50%': { transform: 'perspective(400px) rotateY(14deg) rotateX(-5deg)' },
        },
      },
      animation: {
        pulseLine: 'pulseLine 1.2s linear infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        nodeGlow: 'nodeGlow 2.4s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        tilt3d: 'tilt3d 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
