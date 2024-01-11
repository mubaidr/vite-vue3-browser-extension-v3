/** @type {import('tailwindcss').Config} */
module.exports = {
  important: 'crx-iframe',
  content: ['./src/**/*.{index,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    'prettier-plugin-tailwindcss',
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
  // corePlugins: {
  //   preflight: false, // Disable this configuration option to prevent Tailwind from interfering with the styles of the source website
  // },
  // prefix: 'tw-',
}
