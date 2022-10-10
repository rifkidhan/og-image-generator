/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Epilogue', 'sans-serif']
		},
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '3rem',
				xl: '4rem',
				'2xl': '5rem'
			}
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: '#FFFFFF',
			black: '#18191F',
			accent: {
				5: '#474A57',
				4: '#969BAB',
				3: '#9FA4B4',
				2: '#EEEFF4',
				1: '#F4F5F7'
			},
			red: {
				DEFAULT: '#F95A2C',
				1: '#FF9692',
				2: '#FFE8E8'
			},
			blue: {
				DEFAULT: '#1947E5',
				1: '#8094FF',
				2: '#E9E7FC'
			},
			green: {
				DEFAULT: '#00C6AE',
				1: '#61E4C5',
				2: '#D6FCF7'
			},
			yellow: {
				DEFAULT: '#FFBD12',
				1: '#FFD465',
				2: '#FFF4CC'
			}
		},
		extend: {
			boxShadow: {
				'down-1': '0 2px rgba(23, 24, 31, 1)',
				'down-2': '0 4px rgba(23, 24, 31, 1)',
				'down-3': '0 6px rgba(23, 24, 31, 1)'
			}
		}
	},
	plugins: []
};
