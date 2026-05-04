import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import {version} from './package.json';

export default defineConfig({
    plugins: [react(), svgr()],
    define: {
        __APP_VERSION__: JSON.stringify(process.env.VITE_APP_VERSION || version),
    },
    build: {
        outDir: 'build',
        sourcemap: false,
    },
    server: {
        open: true,
    },
});
