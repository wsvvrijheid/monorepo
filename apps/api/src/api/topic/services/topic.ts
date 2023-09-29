import { factories } from '@strapi/strapi'

import { syncNews } from '../../../libs'

export default factories.createCoreService('api::topic.topic', () => ({
  async sync() {
    const response = await syncNews()

    return response
  },
}))
