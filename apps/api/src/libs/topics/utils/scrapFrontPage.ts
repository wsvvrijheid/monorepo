import axios from 'axios'
import { load } from 'cheerio'

import { ScrapFrontPage, Topic } from './types'

export const scrapFrontPage: ScrapFrontPage = async ({
  publisher,
  locale,
  selectors,
  formatTopic,
  url,
  proxy = '',
  headers,
}) => {
  try {
    const mainUrl = `${proxy}${url}`
    const config = { headers }
    const response = await axios.get(mainUrl, config)

    const $ = load(response.data)

    const wrapper = $(selectors.wrapper)

    const result = wrapper
      .map((_, el) => {
        const topic: Topic = { url: url.toString(), publisher, locale }
        const { title, description, image, imageAttr, category, time, link } =
          selectors

        if (link) {
          const urlText = $(el).find(link).attr('href')
          if (!urlText) {
            console.log(
              'News skipped. There is no url in the selector!',
              `publisher: ${publisher}`,
            )

            return null
          }

          topic.url = urlText?.startsWith('https')
            ? urlText
            : url.origin + urlText
        }

        if (title) {
          topic.title = $(el).find(title).text()
        }

        if (description) {
          topic.description = $(el).find(description).text()
        }

        if (category) {
          const cat = $(el).find(category).text()
          topic.category = cat
        }

        if (image) {
          const imageSrcset = $(el).find(image).attr('srcset')
          const imageText = $(el)
            .find(image)
            .attr(imageAttr ?? 'src')
          const img = imageSrcset
            ? imageSrcset.trim().split(',')[0].split(' ')[0]
            : imageText
          // const urlObj = new URL(url);
          topic.image = !img
            ? ''
            : img.startsWith('http')
            ? img
            : url + '/' + img
        }

        if (time) {
          const timeDateTime = $(el).find(time).attr('datetime')
          const timeText = $(el).find(time).text()
          topic.time = timeDateTime || timeText
        }

        return formatTopic(topic)
      })
      .get()

    const distinctResults = [
      ...new Map(result.map(item => [item['url'], item])).values(),
    ]

    console.log(` ${distinctResults.length} ${publisher} news fetched.`)

    return distinctResults.map(item => formatTopic(item))
  } catch (error: any) {
    console.error(
      `Error while scraping ${url}`,
      error.response?.data || error.message,
    )

    return [
      <Topic>{
        publisher,
        locale,
        url: url.toString(),
        category: 'SCRAPING ERROR',
        time: new Date().toDateString(),
        title: 'ERROR',
        description: 'An error ocurred while scraping topics from : ' + url,
      },
    ]
  }
}
