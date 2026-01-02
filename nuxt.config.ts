// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt'],
  vite: {
    plugins: [tailwindcss()]
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
      whatsAppNumber: process.env.NUXT_PUBLIC_WHATSAPP_NUMBER,
      appEnv: process.env.NUXT_PUBLIC_APP_ENV,
      urlAppGestor: process.env.NUXT_PUBLIC_APP_URL
    }
  },
  app: {
    head: {
      titleTemplate: '%s | Augile',
      title: 'Gestor Automotivo Inteligente'
    }
  }
})