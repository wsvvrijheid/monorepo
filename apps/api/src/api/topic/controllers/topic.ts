import { factories } from '@strapi/strapi'
import { isEmpty } from 'lodash'

export default factories.createCoreController(
  'api::topic.topic',
  ({ strapi }) => ({
    async find(ctx) {
      const response = await super.find(ctx)

      if (!response) return []

      const { data, meta } = response

      const updatedAt = new Date(data.attributes.updatedAt).getTime()
      const now = new Date().getTime()
      const oneHour = 1000 * 60 * 60

      const skipSync = data.attributes.isSyncing || now - updatedAt < oneHour

      let count = 0

      if (!skipSync) {
        await strapi.entityService.update('api::topic.topic', data.id, {
          data: {
            isSyncing: true,
          },
        })

        count = await strapi.service('api::topic.topic').sync()
      }

      const result = await super.find(ctx)
      result.meta.count = count

      const recommendedTopics = (
        await Promise.all(
          ['tr', 'en', 'nl'].map(locale =>
            strapi.entityService.findMany(
              'api::recommended-topic.recommended-topic',
              {
                locale,
                fields: ['url', 'locale'],
              },
            ),
          ),
        )
      )
        ?.flat()
        ?.filter(t => !isEmpty(t))

      const updatedTopics = result?.data?.attributes?.data?.map(topic => {
        const isRecommended = recommendedTopics
          ?.flat()
          ?.some(recommendedTopic => recommendedTopic.url === topic.url)

        return {
          ...topic,
          isRecommended,
        }
      })

      if (!updatedTopics?.length) {
        return result
      }

      return {
        data: {
          ...result.data,
          attributes: {
            ...result.data.attributes,
            data: updatedTopics,
          },
        },
        meta,
      }
    },
  }),
)
