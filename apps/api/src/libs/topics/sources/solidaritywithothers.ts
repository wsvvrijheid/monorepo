import { scrapTopics } from '../utils/scrapTopics'
import { Locale, PageSelectors, Publisher } from '../utils/types'

export const getSolidaritywithothersNews = async () => {
  const url = new URL('https://www.solidaritywithothers.com/news')

  const selectors: PageSelectors = {
    link: 'div.gallery-item-container div.blog-post-homepage-link-hashtag-hover-color a',
  }

  return await scrapTopics({
    publisher: Publisher.SWO,
    locale: Locale.EN,
    url,
    selectors,
  })
}
