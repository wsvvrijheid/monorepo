import { scrapTopics } from '../utils/scrapTopics'
import { FormatTopic, Locale, Publisher, PageSelectors } from '../utils/types'

const getIpaNews = async () => {
  const url = new URL('https://ipa.news/')

  const selectors: PageSelectors = {
    link: 'article.type-post div.item-content div.content-container h2.title a ',
  }

  const formatTopic: FormatTopic = topic => {
    return {
      ...topic,
    }
  }

  return await scrapTopics({
    publisher: Publisher.IPA,
    locale: Locale.EN,
    url,
    selectors,
    formatTopic,
  })
}

export default getIpaNews
