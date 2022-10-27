export default async ({ strapi }) => {
  try {
    const woeids = {
      en: 1,
      tr: 23424969,
      nl: 23424909,
    }

    await Promise.all(
      Object.entries(woeids).map(async ([locale, id]) => {
        const result = await strapi
          .plugin('twitter')
          .config('client')
          .v1.trendsByPlace(id)

        if (!Array.isArray(result)) return
        if (!result[0]) return

        const data = result[0].trends

        await strapi
          .service('api::trend.trend')
          .createOrUpdate({ data: { [locale]: data } })
      }),
    )
  } catch (error) {
    console.error('error', error)
  }
}
