import { scrapLinks } from './scrapLinks'
import { scrapPage } from './scrapPage'
import { ScrapTopics, Topic } from './types'

/** 
   The scraping topic can compose of one or two stages, some sites provide all the 
  required information for our topic object (url, title, description, categories, 
  image, time) on the front page. For those sites, scraping consists of a single 
  stage, in this case you can use `scrapFrontPage`.

  However some other sites don't provide every detail on the front page, so to get 
  the topic object we make an extra request to the detail page and 
  scrap the details from meta tags. So you must provide @selectors.link. Other selectors are 
  optional if you need to find an element with another selector other than meta tags.

  @publisher, @locale, and @url are the mandatory parameters for both single-stage 
  and two-stage scraping. you can use @proxy and @headers if you need.

  @formatTopic is a mandatory callback function that lets you format the topic scraped 
  from the site
*/
export const scrapTopics: ScrapTopics = async ({
  selectors,
  headers,
  locale,
  proxy = '',
  publisher,
  url,
  formatTopic,
}) => {
  /**
    First stage of scraping. It gets links from front page of the site. We send 
    another request to the news detail page to fulfill the topic object.
  */
  const links = await scrapLinks({
    headers,
    proxy,
    selector: selectors.link,
    url,
  })

  const topics: Topic[] = []

  for (const link of links.slice(0, 15)) {
    try {
      /**
      After getting URLs of news from the front page, 
      we sent requests for the details one by one, and then format responses and 
      turn a fully populated topic list. we don't send the request asynchronous 
      way to the same domain so that not to be blocked by the source.
     */
      const topic = await scrapPage({
        publisher,
        locale,
        url: link,
        selectors,
        proxy,
        headers,
      })

      topics.push(formatTopic(topic))
    } catch (error) {
      console.error(link, error)
      topics.push({
        url: link.toString(),
        locale,
        publisher,
      })
    }
  }

  console.log(` ${topics.length} ${publisher} news fetched.`)

  return topics
}
