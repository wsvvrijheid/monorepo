import { scrapTopics } from '../utils/scrapTopics'
import { Locale, PageSelectors, Publisher } from '../utils/types'

export const getSamanyoluNews = async () => {
  const url = new URL('https://www.samanyoluhaber.com')

  const selectors: PageSelectors = {
    link: 'div.slider.main-slider.sh-slider.ana-manset div.item a',
    title: 'meta[itemProp="name"]',
    time: 'meta[itemProp="datePublished"]',
  }

  return await scrapTopics({
    publisher: Publisher.SAMANYOLU,
    locale: Locale.TR,
    url,
    selectors,
  })
}
