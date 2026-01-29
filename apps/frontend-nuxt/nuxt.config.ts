// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt'
  ],
  css: ['../assets/css/main.css'],
  devtools: { enabled: true },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  vite: {
    server: {
      allowedHosts: [
        'inovasionline.com',
        '.inovasionline.com'
      ]
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    devOptions: {
      enabled: false,
    },

    workbox: {
      cleanupOutdatedCaches: true,

      // ❌ MATIKAN precache scanning
      globPatterns: [],

      // ❌ JANGAN precache navigate
      navigateFallback: undefined,

      runtimeCaching: [
        {
          // HTML / navigation (SSR safe)
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages',
          },
        },
        {
          // JS / CSS
          urlPattern: ({ request }) =>
            request.destination === 'script' ||
            request.destination === 'style' ||
            request.destination === 'worker',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'assets',
          },
        },
        {
          // Images
          urlPattern: ({ request }) => request.destination === 'image',
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
      ],
    },

    manifest: {
      id: '/',
      scope: '/',
      start_url: '/',
      name: 'Inovasi Online',
      short_name: 'Inovasi Online',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
      icons: [
        {
          src: '/icon/icon-192-v2.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: '/icon/icon-512-v2.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  }
})