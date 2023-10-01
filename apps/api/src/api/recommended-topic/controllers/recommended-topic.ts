'use strict'

/**
 * recommended-topic controller
 */

import { factories } from '@strapi/strapi'

import { RecommendedTopic } from '../../../libs'
import { assignCreator, getProfile } from '../../../utils'

export default factories.createCoreController(
  'api::recommended-topic.recommended-topic',
  () => ({
    async create(ctx) {
      const profile = await getProfile(ctx, true)

      const result = await super.create(ctx)

      await assignCreator(
        profile,
        result?.data?.id,
        'api::recommended-topic.recommended-topic',
      )

      const topics = await strapi.entityService.findMany('api::topic.topic')

      const newTopics = (topics.data as RecommendedTopic[])?.map(topic => {
        if (topic.url === result?.data?.attributes?.url) {
          return {
            ...topic,
            isRecommended: true,
          }
        }

        return topic
      })

      return {
        ...result,
        data: {
          ...result.data,
          attributes: {
            ...result.data.attributes,
            data: newTopics,
          },
        },
      }
    },
  }),
)
