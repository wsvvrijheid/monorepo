'use strict'

/**
 * recommended-topic controller
 */

import { factories } from '@strapi/strapi'
import { RecommendedTopic } from '../../../libs'

export default factories.createCoreController(
  'api::recommended-topic.recommended-topic',
  ({ strapi }) => ({
    async create(ctx) {
      const result = await super.create(ctx)

      await strapi
        .service('api::recommended-topic.recommended-topic')
        .update(result.data.id, {
          data: { creator: ctx.state.user.id },
        })

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
        data: { data: newTopics },
        meta: {},
      })

      return result
    },
  }),
)
