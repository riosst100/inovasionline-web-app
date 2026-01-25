// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    devOptions: {
      enabled: true
    },

    registerType: 'autoUpdate',

    workbox: {
      navigateFallback: '/', // untuk SPA navigation
      navigateFallbackDenylist: [/^\/api/],

      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages',
          },
        },
        {
          urlPattern: ({ request }) =>
            request.destination === 'style' ||
            request.destination === 'script' ||
            request.destination === 'worker',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'assets',
          },
        },
        {
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
      theme_color: '#0d47a1',
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