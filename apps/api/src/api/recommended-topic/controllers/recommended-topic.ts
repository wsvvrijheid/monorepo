'use strict'

/**
 * recommended-topic controller
 */

import { factories } from '@strapi/strapi'

import { RecommendedTopic } from '../../../libs'
import { assignCreator } from '../../../utils'

export default factories.createCoreController(
  'api::recommended-topic.recommended-topic',
  () => ({
    async create(ctx) {
      const result = await super.create(ctx)

      await assignCreator(
        ctx,
        result.id,
        'api::recommended-topic.recommended-topic',
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
