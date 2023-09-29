import axios from 'axios'
import { load } from 'cheerio'

import { ScrapLinks } from './types'

export const scrapLinks: ScrapLinks = async ({
  selector,
  url,
  proxy = '',
  headers,
}) => {
  const mainUrl = `${proxy}${url}`
  const config = { headers }
  const response = await axios.get(mainUrl, config)

  const $ = load(response.data)

  const links = $(selector)
    .map((_, el) => $(el).attr('href'))
    .get()

  const result = links
    .slice(0, 10)
    .map(link =>
      link.startsWith('https')
        ? new URL(link)
        : new URL(`${url.origin}${link}`),
    )

  const distinctResults = [
    ...new Map(result.map(item => [item['href'], item])).values(),
  ]

  return distinctResults
}
