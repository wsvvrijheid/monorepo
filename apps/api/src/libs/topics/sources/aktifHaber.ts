import { scrapTopics } from '../utils/scrapTopics'
import { Locale, PageSelectors, Publisher } from '../utils/types'

export const getAktifHaber = async () => {
  const url = new URL('https://aktifhaber.com/category/gundem')

  // TODO: Links are not selected correctly
  const selectors: PageSelectors = {
    link: '.jeg_post > .jeg_thumb > a',
  }

  return await scrapTopics({
    publisher: Publisher.AKTIF_HABER,
    locale: Locale.TR,
    url,
    selectors,
  })
}
