import type { TipoPlano } from '~/services/planos.service'

export type LandingEvent =
  | 'cta_primary_click'
  | 'showcase_click'
  | 'signup_open'
  | 'signup_start'
  | 'signup_validation_error'
  | 'signup_success'
  | 'plan_select'
  | 'whatsapp_click'
  | 'comparison_open'
  | 'faq_expand'

export function useLanding() {
  const analytics = useAnalytics()
  const signupOpen = useState('landing-signup-open', () => false)
  const selectedPlan = useState<TipoPlano>('landing-selected-plan', () => 'GRATUITO')

  function track(event: LandingEvent, detail: Record<string, string> = {}) {
    if (!import.meta.client) return
    window.dispatchEvent(new CustomEvent('augile:landing', { detail: { event, ...detail } }))
    analytics.customEvent(event, detail)

    if (event === 'whatsapp_click') analytics.contact(detail)
  }

  function openSignup(plan: TipoPlano = 'GRATUITO', source = 'unknown') {
    selectedPlan.value = plan
    signupOpen.value = true
    track('signup_open', { plan, source })
    analytics.lead({ plan, source })
  }

  return { signupOpen, selectedPlan, openSignup, track }
}
