import type { GoogleTag } from '~/types/analytics'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gaMeasurementId = String(config.public.gaMeasurementId || '')
  const gtmId = String(config.public.gtmId || '')

  window.dataLayer = window.dataLayer || []

  const gtag: GoogleTag = (...args: unknown[]) => {
    window.dataLayer.push(args)
  }

  window.gtag = window.gtag || gtag

  if (gaMeasurementId) {
    window.gtag('js', new Date())
    window.gtag('config', gaMeasurementId, { send_page_view: false })

    useHead({
      script: [{
        key: 'google-analytics',
        src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`,
        async: true
      }]
    })
  }

  if (gtmId) {
    window.dataLayer.push({
      'gtm.start': Date.now(),
      event: 'gtm.js'
    })

    useHead({
      script: [{
        key: 'google-tag-manager',
        src: `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`,
        async: true
      }]
    })
  }
})
