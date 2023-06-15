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

      await strapi.entityService.update(
        'api::recommended-topic.recommended-topic',
        result.data.id,
        {
          data: { creator: ctx.state.user.id },
        },
      )

      const topics = await strapi.entityService.findMany('api::topic.topic')

      const newTopics = (topics as { data: RecommendedTopic[] }).data.map(
        topic => {
          if (topic.url === result?.data?.attributes?.url) {
            topic.isRecommended = true
          }

          return topic
        },
      )

      await strapi.entityService.create('api::topic.topic', {
        data: { data: newTopics },
        meta: {},
      })

      return result
    },
  }),
)
