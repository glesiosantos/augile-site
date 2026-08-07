import type { FacebookPixel } from '~/types/analytics'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const pixelId = String(config.public.metaPixelId || '')

  if (pixelId && !window.fbq) {
    const fbq: FacebookPixel = (...args: unknown[]) => {
      if (fbq.callMethod) {
        fbq.callMethod(...args)
        return
      }

      fbq.queue.push(args)
    }

    fbq.queue = []
    fbq.loaded = true
    fbq.version = '2.0'
    window.fbq = fbq
    window._fbq = fbq

    useHead({
      script: [{
        key: 'meta-pixel',
        src: 'https://connect.facebook.net/en_US/fbevents.js',
        async: true
      }],
      noscript: [{
        key: 'meta-pixel-noscript',
        innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${encodeURIComponent(pixelId)}&ev=PageView&noscript=1" alt="">`
      }]
    })

    window.fbq('init', pixelId)
  }

  let lastTrackedPath = ''
  nuxtApp.hook('page:finish', () => {
    const route = useRoute()
    if (route.fullPath === lastTrackedPath) return

    lastTrackedPath = route.fullPath
    useAnalytics().pageView({
      page_location: window.location.href,
      page_path: route.fullPath,
      page_title: document.title
    })
  })
})
