export type AnalyticsPrimitive = string | number | boolean

export type AnalyticsEventData = Record<string, AnalyticsPrimitive | null | undefined>

export type PurchaseEventData = AnalyticsEventData & {
  value: number
  currency: string
  transaction_id?: string
}

export type FacebookPixel = {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  loaded: boolean
  version: string
}

export type GoogleTag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer: unknown[]
    fbq?: FacebookPixel
    _fbq?: FacebookPixel
    gtag?: GoogleTag
  }
}

export {}
