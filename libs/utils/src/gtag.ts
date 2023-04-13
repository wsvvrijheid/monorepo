// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  ;(window as any).gtag('config', process.env['NX_GA_TRACKING_ID'], {
    page_path: url,
  })
}

type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  ;(window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
