import { scrapFrontPage } from '../utils/scrapFrontPage'
import {
  FormatTopic,
  Locale,
  Publisher,
  FrontPageSelectors,
} from '../utils/types'

export const getNosNews = async () => {
  const url = new URL('https://nos.nl/nieuws')

  const selectors: FrontPageSelectors = {
    wrapper: 'ul.list-items.padded-small li.list-items__item',
    title: 'h3.list-items__title',
    description: 'p.list-items__description',
    link: 'a.link-block.list-items__link',
    image: 'img.list-items__image',
    time: 'time.list-items__time',
    category: 'span.list-items__category',
  }

  const formatTopic: FormatTopic = topic => {
    const category = topic.category?.replace(
      /^\s+|\s+$|\s+(?=\s)|\t|in|\n/g,
      '',
    )

    return {
      ...topic,
      category,
    }
  }

  return await scrapFrontPage({
    publisher: Publisher.NOS,
    locale: Locale.NL,
    url,
    selectors,
    formatTopic,
  })
}
