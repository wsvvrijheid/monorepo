import { scrapTopics } from '../utils/scrapTopics'
import { Locale, Publisher, FormatTopic, PageSelectors } from '../utils/types'

export const getBoldMedyaNews = async () => {
  const url = new URL('https://boldmedya.com')

  const selectors: PageSelectors = {
    link: 'article.jeg_post h2.jeg_post_title a',
  }

  const formatTopic: FormatTopic = topic => {
    const description = topic.description.replace('BOLD - ', '')

    return {
      ...topic,
      description,
    }
  }

  return await scrapTopics({
    publisher: Publisher.BOLD_MEDYA,
    locale: Locale.TR,
    url,
    selectors,
    formatTopic,
  })
}
