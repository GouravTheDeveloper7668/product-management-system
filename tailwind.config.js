module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'navy-blue': {
          DEFAULT: '#1E3A8A', // Navy blue base
          light: '#2C4DA3',
          dark: '#162C69'
        },
        'green': {
          DEFAULT: '#10B981', // Green base
          light: '#34D399',
          dark: '#059669'
        },
        'orange': {
          DEFAULT: '#F97316', // Orange base
          light: '#FB923C',
          dark: '#EA580C'
        }
      }
    }
  },
  plugins: []
};