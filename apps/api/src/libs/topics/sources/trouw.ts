import { scrapTopics } from '../utils/scrapTopics'
import { Locale, PageSelectors, Publisher } from '../utils/types'

export const getTrouwNews = async () => {
  const url = new URL('https://www.trouw.nl/nieuws')

  const selectors: PageSelectors = {
    link: 'article.fjs-teaser-compact.teaser--compact-reverse a.teaser__link',
  }

  return await scrapTopics({
    publisher: Publisher.TROUW,
    locale: Locale.NL,
    url,
    selectors,
  })
}
