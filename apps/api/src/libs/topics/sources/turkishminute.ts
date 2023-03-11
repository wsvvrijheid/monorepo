import {
  FormatTopic,
  Locale,
  Publisher,
  PageSelectors,
  scrapTopics,
} from '../utils'

export const getTurkishMinuteNews = async () => {
  const url = new URL('https://www.turkishminute.com')

  const selectors: PageSelectors = {
    link: 'div.td_block_inner.td-mc1-wrap div.td_module_flex.td_module_flex_1.td_module_wrap.td-animation-stack div.td-module-container.td-category-pos-image div.td-module-meta-info h3.entry-title.td-module-title a',
  }

  const formatTopic: FormatTopic = topic => {
    return {
      ...topic,
    }
  }

  try {
    return await scrapTopics({
      publisher: Publisher.TM,
      locale: Locale.EN,
      url,
      selectors,
      formatTopic,
    })
  } catch (error) {
    console.error('Scrap topics error', error)
    return []
  }
}
