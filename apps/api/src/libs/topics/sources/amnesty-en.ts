import { scrapTopics } from '../utils/scrapTopics'
import { Locale, PageSelectors, Publisher } from '../utils/types'

export const getAmnestyEnNews = async () => {
  const url = new URL('https://www.amnesty.org/en/latest/news/')

  const selectors: PageSelectors = {
    link: 'div.postlist article.post.postImage--small div.post-content header.post-header h1.post-title span a',
  }

  return await scrapTopics({
    publisher: Publisher.AMNESTYEN,
    locale: Locale.EN,
    url,
    selectors,
  })
}
