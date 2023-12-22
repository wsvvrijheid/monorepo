import { scrapTopics } from '../utils/scrapTopics'
import { Locale, PageSelectors, Publisher } from '../utils/types'

export const getNordicMonitorNews = async () => {
  const url = new URL('https://nordicmonitor.com')

  const selectors: PageSelectors = {
    link: '.jeg_postblock_28 .jeg_postsmall a',
  }

  return await scrapTopics({
    publisher: Publisher.NORDIC_MONITOR,
    locale: Locale.EN,
    url,
    selectors,
  })
}
