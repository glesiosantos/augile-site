import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { GoogleTag } from '~/types/analytics'

const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const gaId = String(config.public.gaId || '').trim()

  if (!GA_MEASUREMENT_ID_PATTERN.test(gaId)) return

  window.dataLayer = window.dataLayer || []

  const gtag: GoogleTag = (...args: unknown[]) => {
    window.dataLayer.push(args)
  }

  window.gtag = window.gtag || gtag
  window.gtag('js', new Date())
  window.gtag('config', gaId, { send_page_view: false })

  useHead({
    script: [{
      key: 'google-analytics',
      src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`,
      async: true
    }]
  })

  const router = useRouter()
  let lastTrackedPath = ''

  async function trackPageView(route: RouteLocationNormalizedLoaded) {
    if (route.fullPath === lastTrackedPath) return

    lastTrackedPath = route.fullPath
    await nextTick()

    window.gtag?.('event', 'page_view', {
      page_path: route.fullPath,
      page_location: window.location.href,
      page_title: document.title
    })
  }

  nuxtApp.hook('app:mounted', () => trackPageView(router.currentRoute.value))
  router.afterEach(to => trackPageView(to))
})
