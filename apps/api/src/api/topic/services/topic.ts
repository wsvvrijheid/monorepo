import { factories } from '@strapi/strapi'

import { syncNews } from '../../../libs'

export default factories.createCoreService(
  'api::topic.topic',
  ({ strapi }) => ({
    async sync() {
      const response = await syncNews({ strapi })

      return response
    },
  }),
)
