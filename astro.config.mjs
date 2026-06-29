// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Parisienne',
			cssVariable: '--font-parisienne',
			weights: [400],
			styles: ['normal'],
			display: 'block',
			fallbacks: ['cursive'],
		},
		{
			provider: fontProviders.google(),
			name: 'Cormorant Garamond',
			cssVariable: '--font-cormorant-garamond',
			weights: [400, 500, 600, 700],
			styles: ['normal'],
			fallbacks: ['serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Plus Jakarta Sans',
			cssVariable: '--font-plus-jakarta-sans',
			weights: [400, 500, 600, 700],
			styles: ['normal'],
			fallbacks: ['sans-serif'],
		},
	],
});
