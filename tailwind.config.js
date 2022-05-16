module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./layouts/**/*.{js,ts,jsx,tsx}',
		'./modals/**/*.{js,ts,jsx,tsx}',
		'./stories/**/*.{js,ts,jsx,tsx}',
		'./landing-secitions/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'lightBlue': '#739EF1',
				'gold': '#FABF48',
				'softGold': '#FEF2DA',
				'red': '#FF6D3B',
				'green': '#8FD8B5',
				'darkBlue': '#575FCC',
				'black': '#283244',

				'button': '#575FCC',
				'button-secondary': '#ECEDF0',
				'button-outline': '#E0E1E6',

				'icon': '#575FCC',
				'icon-secondary': '#919399',

				'text': '#575FCC',
				'text-secondary': '#74767A',

				'gray-20': '#F9F9FA',
				'gray-40': '#F3F3F5',
				'gray-60': '#ECEDF0',
				'gray-80': '#E6E7EB',
				'gray-100': '#E0E1E6',
			},
			spacing: {
				'4.5': '1.125rem',
			},
			gridTemplateColumns: {
				'between': 'auto 1fr auto',
			},
		},
	},
	plugins: [],
};
