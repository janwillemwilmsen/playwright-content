module.exports = {
  content: [
    './public/*.{html,js}',
  ],
  safelist: [
    'flex',
    'flex-row',
    'flex-1',
    'flex-none',
    'w-40', 
    'w-10', 
    'w-20', 
    'w-24',
    'w-28',
    'w-14', 
    'text-blue-500',
    'text-md',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],

}
