/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'dark-indigo': '#19191A',
				crimson: '#E43D2A',
				gray: '#6E7681',
				maroon: '#64251D',
			},
		},
	},
	plugins: [],
}
