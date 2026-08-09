export default defineNuxtPlugin((nuxtApp) => {
  const { capture } = useMarketingAttribution()

  nuxtApp.hook('page:finish', () => {
    capture(useRoute().query)
  })
})
