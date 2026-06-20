export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/main.css'],
  components: [
    { path: '~/components', pathPrefix: false }
  ],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ]
    }
  }
})
