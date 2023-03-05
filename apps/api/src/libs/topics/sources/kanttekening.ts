import { scrapTopics } from '../utils/scrapTopics'
import { FormatTopic, Publisher, Locale, PageSelectors } from '../utils/types'

export const getKanttekeningNews = async () => {
  const url = new URL('https://dekanttekening.nl')

  const selectors: PageSelectors = {
    link: 'h3.entry-title.td-module-title a',
    category: '.tdb-entry-category',
  }

  const formatTopic: FormatTopic = topic => {
    return {
      ...topic,
    }
  }

  return await scrapTopics({
    publisher: Publisher.KATTENKENING,
    locale: Locale.NL,
    url,
    selectors,
    formatTopic,
  })
}
