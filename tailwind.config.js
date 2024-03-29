module.exports = {
  purge: ['./src/**/*.js'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {
        // display: '',
        sans: ['Raleway', 'sans-serif'],
      },
      borderWidth: { 16: '16px' },
      height: {
        96: '24rem',
        128: '32rem',
        192: '48rem',
      },
    },
  },

  plugins: [],
};
