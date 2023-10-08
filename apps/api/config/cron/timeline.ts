import { ApifyClient } from 'apify-client'

export default async () => {
  const locales = ['en', 'nl', 'tr']
  try {
    const timelinePromise = await Promise.all(
      locales.map(locale => {
        return strapi.entityService.findMany('api::timeline.timeline', {
          filters: { locale },
        })
      }),
    )

    const timelines = timelinePromise.flat()

    if (!Array.isArray(timelines)) return
    if (!timelines[0]) return

    const apify = new ApifyClient({
      token: process.env.APIFY_TOKEN,
    })

    timelines.forEach(async timeline => {
      const input = {
        max_tweets: 50,
        language: timeline.locale,
        use_experimental_scraper: false,
        from_user: [timeline.username],
        max_attempts: 5,
      }
      const run = await apify.actor('shanes~tweet-flash').call(input)
      const { items } = await apify.dataset(run.defaultDatasetId).listItems()
      const formattedItems = items.map(item => {
        return {
          id: item.tweet_id,
          user: timeline.userData,
          image: item.images ? item.images[0] : undefined,
          text: item.text,
          createdAt: item.timestamp,
          likes: item.likes,
          retweets: item.retweets,
          replies: item.replies,
        }
      })
      await strapi.entityService.update('api::timeline.timeline', timeline.id, {
        data: { tweets: formattedItems },
      })
    })
  } catch (error) {
    console.error('Error updating timeline tweet', error)
  }
}
