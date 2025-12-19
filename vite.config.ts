import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	base: './', // Ensures assets are linked relative to index.html, needed for GitHub Pages
	plugins: [react()],
});
