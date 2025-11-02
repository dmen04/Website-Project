import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import injectHTML from 'vite-plugin-html-inject'

export default defineConfig({
    plugins: [
        tailwindcss(),
        injectHTML()
    ],
    server: {
        proxy: {
            '/api/nba': {
                target: 'https://cdn.nba.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/nba/, ''),
                secure: false
            }
        }
    }
})