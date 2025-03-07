/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{html,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['light', 'dark'],
    logs: false,
  },
  safelist: [
    {
      pattern: /^.*$/,  // 👈  This includes all Tailwind classes in the bundle
    },
  ],
}
