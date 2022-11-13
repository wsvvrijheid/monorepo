import { scrapTopics } from '../utils/scrapTopics'
import { FormatTopic, Locale, PageSelectors, Publisher } from '../utils/types'

const getAmnestyEn = async () => {
  const url = new URL('https://www.amnesty.org/en/latest/news/')

  const selectors: PageSelectors = {
    link: 'div.postlist article.post.postImage--small div.post-content header.post-header h1.post-title span a',
    image: 'article.post.postImage--small figure.post-figure img',
  }

  const formatTopic: FormatTopic = topic => {
    return {
      ...topic,
    }
  }

  return await scrapTopics({
    publisher: Publisher.AMNESTYEN,
    locale: Locale.EN,
    url,
    selectors,
    formatTopic,
  })
}

export default getAmnestyEn
