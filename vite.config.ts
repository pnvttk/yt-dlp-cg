import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'path'

import packageJson from './package.json'

export default defineConfig({
    base: './',
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },

    define: {
        __APP_VERSION__: JSON.stringify(packageJson.version),
    },
})
