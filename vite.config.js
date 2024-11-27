import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import laravel from 'laravel-vite-plugin';

export default defineConfig(({ mode }) => {
    return {
        plugins: [laravel(['resources/js/src/main.tsx']), react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        define: {
            'process.env.NODE_ENV': `"${mode}"`,
            'process.env.API_URL': mode === 'staging' ? '"https://phplaravel-1293057-4701893.cloudwaysapps.com/"' : '"http://localhost"',
        },
    };
});
