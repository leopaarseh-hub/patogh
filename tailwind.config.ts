import type { Config } from 'tailwindcss';
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:      'var(--bg)',
        surface: 'var(--surface)',
        s2:      'var(--s2)',
        red:     'var(--red)',
        dark:    'var(--dark)',
        ctxt:    'var(--text)',
        sec:     'var(--sec)',
        muted:   'var(--muted)',
      },
      fontFamily: {
        persian: ['var(--font-vazirmatn)', 'Tahoma', 'sans-serif'],
        latin:   ['var(--font-inter)',     'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
