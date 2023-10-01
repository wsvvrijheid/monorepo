import { scrapTopics } from '../utils/scrapTopics'
import { Locale, PageSelectors, Publisher } from '../utils/types'

export const getAmnesty = async () => {
  const url = new URL('https://www.amnesty.nl/nieuws')

  const selectors: PageSelectors = {
    link: 'article.teaser a.teaser__link',
    time: 'meta[property="article:modified_time"]',
  }

  return await scrapTopics({
    publisher: Publisher.AMNESTY,
    locale: Locale.NL,
    url,
    selectors,
  })
}
