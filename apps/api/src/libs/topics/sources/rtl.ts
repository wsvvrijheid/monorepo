import { scrapTopics } from '../utils/scrapTopics'
import { Locale, PageSelectors, Publisher } from '../utils/types'

export const getRtlNews = async () => {
  const url = new URL('https://www.rtlnieuws.nl')

  const selectors: PageSelectors = {
    link: '.opening-net-binnen__list > a',
  }

  return await scrapTopics({
    publisher: Publisher.RTL,
    locale: Locale.NL,
    url,
    selectors,
  })
}
