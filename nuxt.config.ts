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
    registerType: 'autoUpdate',
    manifest: {
      name: 'Inovasi Online',
      short_name: 'Inovasi',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#0d47a1',
      icons: [
        {
          src: '/icons/icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
})