const { FaRegBell } = require('react-icons/fa');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'ping-slow': 'ping 3s linear infinite',
      },
    },
    colors: {
      text: '#023047',
      btn: '#FD9E02',
      cardBackground: '#219EBC',
      orange: '#FB8500',
      titelAndQuestion: '#FFF',
      correct: 'rgb(22 163 74)',
      wrong: '#AE2012',
      answerButton: '#126782',
      black: '#000',
    },
  },
  plugins: [],
};
