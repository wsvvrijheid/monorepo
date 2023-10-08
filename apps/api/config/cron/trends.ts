import { getTwitterClient } from '../../src/libs'

export default async () => {
  try {
    const woeids = {
      en: 1,
      tr: 23424969,
      nl: 23424909,
    }

    return

    const twitterClient = await getTwitterClient()

    Object.entries(woeids).forEach(async ([locale, id]) => {
      const result = await twitterClient.v1.get('trends/place.json', { id })

      if (!Array.isArray(result)) return
      if (!result[0]) return

      const data = result[0].trends

      await strapi.entityService.create('api::trend.trend', {
        data: { [locale]: data },
      })
    })
  } catch (error) {
    console.error('Error while fetching trends', error.message)
  }
}
