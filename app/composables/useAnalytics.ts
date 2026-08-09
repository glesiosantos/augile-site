import type { AnalyticsEventData, PurchaseEventData } from '~/types/analytics'

type StandardEvent =
  | 'PageView'
  | 'ViewContent'
  | 'Lead'
  | 'Contact'
  | 'StartTrial'
  | 'CompleteRegistration'
  | 'Purchase'

const googleEventNames: Record<StandardEvent, string> = {
  PageView: 'page_view',
  ViewContent: 'view_item',
  Lead: 'generate_lead',
  Contact: 'contact',
  StartTrial: 'begin_trial',
  CompleteRegistration: 'sign_up',
  Purchase: 'purchase'
}

export function useAnalytics() {
  const { eventData } = useMarketingAttribution()

  function send(event: StandardEvent, data: AnalyticsEventData = {}) {
    if (!import.meta.client) return

    const payload = { ...eventData(), ...data }
    window.gtag?.('event', googleEventNames[event], payload)
    window.fbq?.('track', event, payload)
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

  function trialStart(data: AnalyticsEventData = {}) {
    send('StartTrial', data)
  }

  function completeRegistration(data: AnalyticsEventData = {}) {
    send('CompleteRegistration', data)
  }

  function purchase(data: PurchaseEventData) {
    send('Purchase', data)
  }

  function customEvent(name: string, data: AnalyticsEventData = {}) {
    if (!import.meta.client) return

    const payload = { ...eventData(), ...data }
    window.gtag?.('event', name, payload)
    window.fbq?.('trackCustom', name, payload)
  }

  return {
    pageView,
    viewContent,
    lead,
    contact,
    trialStart,
    completeRegistration,
    purchase,
    customEvent,
    trackPageView: pageView,
    trackViewContent: viewContent,
    trackLead: lead,
    trackContact: contact,
    trackCompleteRegistration: completeRegistration,
    trackPlanView: viewContent,
    trackTrialStart: trialStart,
    trackPurchase: purchase,
    trackCustomEvent: customEvent
  }
}
