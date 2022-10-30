import { scrapTopics } from '../utils/scrapTopics'
import { FormatTopic, Locale, Publisher, PageSelectors } from '../utils/types'

const getTrouwNews = async () => {
  const url = new URL('https://www.trouw.nl/nieuws')

  const selectors: PageSelectors = {
    link: 'article.fjs-teaser-compact.teaser--compact-reverse a.teaser__link',
  }

  const formatTopic: FormatTopic = topic => {
    return {
      ...topic,
    }
  }

  return await scrapTopics({
    publisher: Publisher.TROUW,
    locale: Locale.NL,
    url,
    selectors,
    formatTopic,
  })
}

export default getTrouwNews
