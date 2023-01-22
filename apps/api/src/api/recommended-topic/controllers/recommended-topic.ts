'use strict'

/**
 * recommended-topic controller
 */

import { factories } from '@strapi/strapi'
import { RecommendedTopic } from '../../../libs/topics/utils/types'

export default factories.createCoreController(
  'api::recommended-topic.recommended-topic',
  ({ strapi }) => ({
    async create(ctx) {
      const result = await super.create(ctx)

      const topics = await strapi.service('api::topic.topic').find({})

      const newTopics = (topics as { data: RecommendedTopic[] }).data.map(
        topic => {
          if (topic.url === result?.data?.attributes?.url) {
            topic.isRecommended = true
          }
          return topic
        },
      )

      await strapi.service('api::topic.topic').createOrUpdate({
        data: { data: newTopics, creator: ctx.state.user.id },
        meta: {},
      })

      return result
    },
  }),
)
