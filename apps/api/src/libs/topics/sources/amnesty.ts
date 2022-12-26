import { scrapTopics } from '../utils/scrapTopics'
import { FormatTopic, Locale, PageSelectors, Publisher } from '../utils/types'

const getAmnesty = async () => {
  const url = new URL('https://www.amnesty.nl/nieuws')

  const selectors: PageSelectors = {
    link: 'article.teaser a.teaser__link',
    time: 'meta[property="article:modified_time"]',
  }

  const formatTopic: FormatTopic = topic => {
    return {
      ...topic,
    }
  }

  return await scrapTopics({
    publisher: Publisher.AMNESTY,
    locale: Locale.NL,
    url,
    selectors,
    formatTopic,
  })
}

export default getAmnesty
