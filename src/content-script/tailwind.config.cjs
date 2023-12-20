/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{index,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
  corePlugins: {
    preflight: false,  // Disable this configuration option to prevent Tailwind from interfering with the styles of the source website
  },
  prefix: 'tw-',  // If you do not set a prefix, class names may conflict with those of the source webpage
}
