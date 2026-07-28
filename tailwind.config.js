/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        atelier: '#EDEEE9',
        graphite: '#1D201F',
        tole: '#E2E4DC',
        cordeau: {
          DEFAULT: '#2C4A6E',
          light: '#DCE4EC',
        },
        securite: {
          DEFAULT: '#F0B400',
          dark: '#D9A400',
        },
        ligne: '#6E7268',
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'sans-serif'],
        lecture: ['"Public Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['56px', { lineHeight: '58px', fontWeight: '800' }],
        'display-l':  ['40px', { lineHeight: '44px', fontWeight: '700' }],
        'display-m':  ['28px', { lineHeight: '32px', fontWeight: '700' }],
        'lecture-l':  ['20px', { lineHeight: '32px', fontWeight: '400' }],
        'lecture':    ['17px', { lineHeight: '28px', fontWeight: '400' }],
        'legende':    ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'mono-l':     ['24px', { lineHeight: '28px', fontWeight: '500' }],
        'mono-base':  ['15px', { lineHeight: '22px', fontWeight: '400' }],
        'kicker':     ['13px', { lineHeight: '16px', fontWeight: '500', letterSpacing: '0.04em' }],
      },
      borderRadius: {
        none: '0px',
        sm: '1px',
        DEFAULT: '0px',
      },
      boxShadow: {
        none: 'none',
        etch: 'inset 0 0 0 1px #1D201F',
      },
    },
  },
  plugins: [],
}
