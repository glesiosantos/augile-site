import type { TipoPlano } from '~/services/planos.service'

export type LandingEvent =
  | 'cta_primary_click'
  | 'showcase_click'
  | 'signup_open'
  | 'signup_start'
  | 'signup_validation_error'
  | 'signup_success'
  | 'plan_selected'
  | 'whatsapp_click'
  | 'comparison_open'
  | 'faq_expand'

export function useLanding() {
  const analytics = useAnalytics()
  const signupOpen = useState('landing-signup-open', () => false)
  const selectedPlan = useState<TipoPlano>('landing-selected-plan', () => 'BASICO')

  function planName(plan: TipoPlano) {
    return plan.toLowerCase()
  }

  function track(event: LandingEvent, detail: Record<string, string> = {}) {
    if (!import.meta.client) return
    window.dispatchEvent(new CustomEvent('augile:landing', { detail: { event, ...detail } }))

    if (event === 'whatsapp_click') {
      analytics.trackContact({ channel: 'whatsapp', location: detail.location || detail.source })
      return
    }

    analytics.trackCustomEvent(event, detail)
  }

  function openSignup(plan: TipoPlano = 'BASICO', source = 'unknown') {
    selectedPlan.value = plan
    signupOpen.value = true
    const planSlug = planName(plan)
    track('signup_open', { plan: planSlug, source })
    analytics.trackLead({ plan: planSlug, source })
    analytics.trackTrialStart({ plan: planSlug, source, trial_days: 14 })
  }

  return { signupOpen, selectedPlan, openSignup, track }
}
