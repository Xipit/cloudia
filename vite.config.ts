import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	//preprocessor: [vitePreprocess()]
};

export default config;
