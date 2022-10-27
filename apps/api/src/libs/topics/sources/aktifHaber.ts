import { scrapTopics } from '../utils/scrapTopics'
import { FormatTopic, Publisher, Locale, PageSelectors } from '../utils/types'

const getAktifHaber = async () => {
  const url = new URL('https://aktifhaber.com')

  // TODO: Links are not selected correctly
  const selectors: PageSelectors = {
    link: '.owl-carousel.manset a',
  }

  const formatTopic: FormatTopic = topic => {
    return {
      ...topic,
    }
  }

  return await scrapTopics({
    publisher: Publisher.AKTIF_HABER,
    locale: Locale.TR,
    url,
    selectors,
    formatTopic,
  })
}

export default getAktifHaber
