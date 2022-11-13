import { scrapTopics } from '../utils/scrapTopics'
import { FormatTopic, Locale, Publisher, PageSelectors } from '../utils/types'

const getSolidaritywithothersNews = async () => {
  const url = new URL('https://www.solidaritywithothers.com/news')

  const selectors: PageSelectors = {
    link: 'div.gallery-item-container div.blog-post-homepage-link-hashtag-hover-color a',
  }

  const formatTopic: FormatTopic = topic => {
    return {
      ...topic,
    }
  }

  // TODO: Meta tags seem not to be selected correctly
  return await scrapTopics({
    publisher: Publisher.SWO,
    locale: Locale.EN,
    url,
    selectors,
    formatTopic,
  })
}

export default getSolidaritywithothersNews
