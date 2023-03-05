import { scrapTopics } from '../utils/scrapTopics'
import { FormatTopic, Locale, Publisher, PageSelectors } from '../utils/types'

export const getTr724News = async () => {
  const url = new URL('https://www.tr724.com')

  const selectors: PageSelectors = {
    link: 'div.swiper-slide a',
  }

  const formatTopic: FormatTopic = topic => {
    return {
      ...topic,
    }
  }

  return await scrapTopics({
    publisher: Publisher.TR724,
    locale: Locale.TR,
    url,
    selectors,
    formatTopic,
  })
}
