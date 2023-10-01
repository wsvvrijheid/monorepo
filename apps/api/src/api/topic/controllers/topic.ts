import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::topic.topic', () => ({
  async find(ctx) {
    const response = await super.find(ctx)

    if (!response) return []

    const updatedTopics = await Promise.all(
      response?.data?.attributes?.data?.map(async topic => {
        const found = await strapi
          .query('api::recommended-topic.recommended-topic')
          .count({
            where: {
              locale: { $in: ['tr', 'en', 'nl'] },
              url: topic.url,
            },
          })
          .catch(() => null)

        return {
          ...topic,
          isRecommended: found > 0,
        }
      }),
    )

    if (!updatedTopics?.length) {
      return response
    }

    return {
      data: {
        attributes: {
          ...(response?.data?.attributes || {}),
          data: updatedTopics,
        },
      },
      meta: response.meta,
    }
  },
}))
