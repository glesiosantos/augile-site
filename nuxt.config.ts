export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  sourcemap: {
    client: false,
    server: false
  },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt'],
  devServer: {
    port: 4000
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
      whatsAppNumber: process.env.NUXT_PUBLIC_WHATSAPP_NUMBER,
      urlAppGestor: process.env.NUXT_PUBLIC_APP_URL,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      metaPixelId: process.env.NUXT_PUBLIC_META_PIXEL_ID,
      gaMeasurementId: process.env.NUXT_PUBLIC_GA_ID,
      gtmId: process.env.NUXT_PUBLIC_GTM_ID
    }
  },
  app: {
    head: {
      titleTemplate: '%s | Augile',
      title: 'Gestor Automotivo Inteligente'
    }
  }
})
