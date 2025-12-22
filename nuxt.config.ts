// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt'],
  vite: {
    plugins: [tailwindcss()]
  },
  devServer: {
    port: 3001
  },
  runtimeConfig: {
    graphqlSecretKey: process.env.GRAPHQL_SECRET_KEY,
    public: {
      GRAPHQL_ENDPOINT: process.env.NUXT_PUBLIC_GRAPHQL_ENDPOINT,
      WHATSAPP_NUMBER: process.env.NUXT_PUBLIC_WHATSAPP_NUMBER,
      APP_ENV: process.env.NUXT_PUBLIC_APP_ENV,
      URL_APP_GESTOR: process.env.NUXT_PUBLIC_APP_URL
    }
  }
})