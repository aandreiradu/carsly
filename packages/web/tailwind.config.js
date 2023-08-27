/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        '4cols-258': 'repeat(4, minmax(258px, 1fr))',
        '3cols-258': 'repeat(3, minmax(258px, 1fr))',
        '2cols-258': 'repeat(2, minmax(258px, 1fr))',
      },
      backgroundColor: {
        'default-gray': '#373737',
        'default-yellow': 'rgb(253 224 71)',
      },
      fontFamily: {
        kanit: "'Kanit', sans-serif",
      },
      backgroundImage: {
        'landing-1': "url('/landing-1.jpg')",
        'landing-2': "url('/landing-2.jpg')",
        'login-pattern': "url('./landing-1.jpg'), linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(252,252,252,1) 100%))",
      },
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
      expendHeight: {
        from: {
          height: '200px',
        },
        to: {
          height: '600px',
        },
      },
      animation: {
        expendHeight: 'expendHeight 1s linear',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
