/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // Preflight is disabled so Tailwind utilities layer cleanly on top of
  // Bootstrap's reboot instead of fighting it for base element styles.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        obsidian: '#05060f',
        abyss: '#0a0c1c',
        royal: { DEFAULT: '#7c3aed', deep: '#3b0a6b', light: '#a78bfa' },
        divine: { DEFAULT: '#e8b923', light: '#f7dd8a', deep: '#a37a0d' },
        credible: { DEFAULT: '#2563eb', light: '#60a5fa', deep: '#0b2a6b' },
        purpose: { DEFAULT: '#10b981', light: '#5eead4', deep: '#064e3b' },
        exuberance: { DEFAULT: '#ff6b9d', light: '#ffa8c5', deep: '#9d174d' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      screens: { xs: '480px' },
      transitionTimingFunction: {
        regal: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
