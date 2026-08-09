import type { MarketingAttribution } from '~/types/analytics'

const attributionKey = 'augile_marketing_attribution'
const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const

function sanitize(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 200) : ''
}

export function useMarketingAttribution() {
  const attribution = useState<MarketingAttribution>('marketing-attribution', () => ({}))

  function readStored(): MarketingAttribution {
    if (!import.meta.client) return {}

    try {
      const stored = sessionStorage.getItem(attributionKey)
      return stored ? JSON.parse(stored) as MarketingAttribution : {}
    } catch {
      return {}
    }
  }

  function capture(query: Record<string, unknown>) {
    if (!import.meta.client) return

    const stored = readStored()
    const received = Object.fromEntries(
      utmKeys
        .map(key => [key, sanitize(query[key])])
        .filter(([, value]) => value)
    ) as MarketingAttribution

    attribution.value = Object.keys(stored).length ? stored : received

    if (!Object.keys(stored).length && Object.keys(received).length) {
      sessionStorage.setItem(attributionKey, JSON.stringify(received))
    }
  }

  function eventData(): MarketingAttribution & { source?: string; campaign?: string } {
    const current = Object.keys(attribution.value).length ? attribution.value : readStored()

    return {
      ...current,
      source: current.utm_source,
      campaign: current.utm_campaign
    }
  }

  return { attribution: readonly(attribution), capture, eventData }
}
