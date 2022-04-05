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
      background: '#818589',
      text: '#023047',
      btn: '#FD9E02',
      input: '#D3D3D3',
      border: '#4a4a4a',
      Bg: '#219EBC',
      In: 'rgb(11, 23, 106)',
      Ans: 'rgb(57, 74, 174)',
      Orng: '#FB8500',
      fro: 'rgba(253, 249, 249, 0.20)',
      to: '#FFF',
      correct: 'rgb(22 163 74)',
      wrong: '#AE2012',
      titel: '#023047',
      answerButton: '#126782',
    },
  },
  plugins: [],
};
