import type { AnalyticsEventData, PurchaseEventData } from '~/types/analytics'

type StandardEvent =
  | 'PageView'
  | 'ViewContent'
  | 'Lead'
  | 'Contact'
  | 'CompleteRegistration'
  | 'Purchase'

const googleEventNames: Record<StandardEvent, string> = {
  PageView: 'page_view',
  ViewContent: 'view_item',
  Lead: 'generate_lead',
  Contact: 'contact',
  CompleteRegistration: 'sign_up',
  Purchase: 'purchase'
}

export function useAnalytics() {
  function send(event: StandardEvent, data: AnalyticsEventData = {}) {
    if (!import.meta.client) return

    window.gtag?.('event', googleEventNames[event], data)
    window.fbq?.('track', event, data)
  }

  function pageView(data: AnalyticsEventData = {}) {
    send('PageView', data)
  }

  function viewContent(data: AnalyticsEventData = {}) {
    send('ViewContent', data)
  }

  function lead(data: AnalyticsEventData = {}) {
    send('Lead', data)
  }

  function contact(data: AnalyticsEventData = {}) {
    send('Contact', data)
  }

  function completeRegistration(data: AnalyticsEventData = {}) {
    send('CompleteRegistration', data)
  }

  function purchase(data: PurchaseEventData) {
    send('Purchase', data)
  }

  function customEvent(name: string, data: AnalyticsEventData = {}) {
    if (!import.meta.client) return

    window.gtag?.('event', name, data)
    window.fbq?.('trackCustom', name, data)
  }

  return {
    pageView,
    viewContent,
    lead,
    contact,
    completeRegistration,
    purchase,
    customEvent
  }
}
