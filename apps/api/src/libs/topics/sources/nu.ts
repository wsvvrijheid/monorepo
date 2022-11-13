import { scrapTopics } from '../utils/scrapTopics'
import { FormatTopic, Locale, Publisher, PageSelectors } from '../utils/types'

const getNuNews = async () => {
  const url = new URL('https://nu.nl/net-binnen')

  const selectors: PageSelectors = {
    link: '.block.articlelist:not(.dispnone) li.list__item--thumb a.list__link',
  }

  const formatTopic: FormatTopic = topic => {
    return {
      ...topic,
    }
  }

  // TODO: Meta tags seem not to be selected correctly
  return await scrapTopics({
    publisher: Publisher.NU,
    locale: Locale.NL,
    url,
    selectors,
    formatTopic,
  })
}

export default getNuNews
