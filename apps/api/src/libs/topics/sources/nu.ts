import { AxiosHeaders } from 'axios'

import { scrapTopics } from '../utils/scrapTopics'
import { Locale, PageSelectors, Publisher } from '../utils/types'

export const getNuNews = async () => {
  const url = new URL('https://nu.nl/net-binnen')

  const selectors: PageSelectors = {
    link: '.list__item > a.list__link',
  }

  const headers = new AxiosHeaders()

  headers.set(
    'User-Agent',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
  )

  // TODO: Meta tags seem not to be selected correctly
  return await scrapTopics({
    publisher: Publisher.NU,
    locale: Locale.NL,
    url,
    selectors,
    headers,
  })
}
