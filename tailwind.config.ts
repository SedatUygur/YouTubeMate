import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	darkMode: 'class', // Opt for dark mode to be handled via the class method
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'),'../**/*.{html,js,svelte,ts}') // Append the path to the Skeleton package
	],
	theme: {
		extend: {},
	},
	plugins: [
		typography, forms, containerQueries, skeleton // Append the Skeleton plugin (after other plugins)
	]
} satisfies Config;

export default config;
