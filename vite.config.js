import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'smui-theme': '/src/theme/_smui-theme.scss'
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				loadPaths: ['node_modules']
			}
		}
	}
});
