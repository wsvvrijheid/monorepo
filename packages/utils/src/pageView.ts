// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  ;(window as any).gtag('config', process.env['NX_GA_TRACKING_ID'], {
    page_path: url,
  })
}
