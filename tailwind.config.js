/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: '#1C1E1A',
        bg: '#EDEFE8',
        surface: '#E1E4D9',
        accent: '#3C6E58',
        signal: '#B8791A',
        line: '#8E9488',
      },
      fontFamily: {
        display: ['"Big Shoulders"', 'sans-serif'],
        body: ['"Public Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '1.02', fontWeight: '800' }],
        'display-l': ['clamp(2rem, 4vw, 2.75rem)', { lineHeight: '1.08', fontWeight: '700' }],
        'display-m': ['1.5rem', { lineHeight: '1.15', fontWeight: '600' }],
        'block-title': ['1.125rem', { lineHeight: '1.3', fontWeight: '700' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        body: ['1rem', { lineHeight: '1.65', fontWeight: '400' }],
        small: ['0.875rem', { lineHeight: '1.5', fontWeight: '500' }],
        data: ['0.9375rem', { lineHeight: '1.4', fontWeight: '500' }],
        label: ['0.75rem', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '0.08em' }],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        lg: '10px',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(28 30 26 / 0.06), 0 1px 1px 0 rgb(28 30 26 / 0.04)',
      },
    },
  },
  plugins: [],
}
