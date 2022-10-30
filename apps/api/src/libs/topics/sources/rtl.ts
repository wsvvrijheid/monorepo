import { scrapTopics } from '../utils/scrapTopics'
import { FormatTopic, Locale, Publisher, PageSelectors } from '../utils/types'

const getRtlNews = async () => {
  const url = new URL('https://www.rtlnieuws.nl/net-binnen')

  const selectors: PageSelectors = {
    link: 'div.large-4.medium-4.small-12.columns.relative.grid-block a.js_link.image-block-link',
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

export default getRtlNews
