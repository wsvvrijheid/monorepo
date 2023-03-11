import { scrapTopics } from '../utils/scrapTopics'
import { FormatTopic, Locale, Publisher, PageSelectors } from '../utils/types'

export const getRtlNews = async () => {
  const url = new URL('https://www.rtlnieuws.nl')

  const selectors: PageSelectors = {
    link: '.opening-net-binnen__list > a',
  }

  const formatTopic: FormatTopic = topic => {
    return {
      ...topic,
    }
  }

  return await scrapTopics({
    publisher: Publisher.RTL,
    locale: Locale.NL,
    url,
    selectors,
    formatTopic,
  })
}
