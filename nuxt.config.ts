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
      title: 'M. Rifqi Dzaky Azhad',
      meta: [
        { name: 'description', content: 'Medical imaging ML researcher at Telkom University. Bone scan diagnostic pipeline AUC 0.956, IEEE Xplore publication, production ML system on mining fleet dashcams.' },
        { property: 'og:title', content: 'M. Rifqi Dzaky Azhad' },
        { property: 'og:description', content: 'Medical imaging ML researcher. Two published papers, two funded projects, one system in production.' },
        { property: 'og:image', content: '/images/me.png' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'M. Rifqi Dzaky Azhad' },
        { name: 'twitter:description', content: 'Medical imaging ML researcher. AUC 0.956, IEEE Xplore, production ML.' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ]
    }
  }
})
