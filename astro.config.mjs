// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;

// https://astro.build/config
export default defineConfig({
    server: {
        port: PORT,
        host: true // Set to true to expose the server to your network
    },
    i18n: {
        locales: ["en", "vi"],
        defaultLocale: "en",
        routing: {
            prefixDefaultLocale: true
        },
        routeExclusions: ['/_image', '/_image/*', '_astro', '_astro/*']
    },
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
	experimental: {
        svg: {
            mode: 'inline',
        }
    },
    devToolbar: {
        enabled: false
    }
    // vite: {
    //     optimizeDeps: {
    //         include: ['@astrojs/axobject-query'],
    //         exclude: []
    //     }
    // }
});