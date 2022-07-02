import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import { ViteAliases } from 'vite-aliases';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        ViteAliases({
            dir: 'src',
            prefix: '@',
            deep: true,
            depth: 1,
            createLog: true,
            logPath: 'src/logs',
            useIndexes: true,
            useConfig: true,
            root: process.cwd(),
        }),
    ],
    publicDir: 'public',
    build: {
        outDir: 'dist',
    },
});
