import { syncNews } from '../../../libs'

const { createCoreService } = require('@strapi/strapi').factories

export default createCoreService('api::topic.topic', ({ strapi }) => ({
  async sync(...args: any[]) {
    const response = await syncNews({ strapi })

    return response
  },
}))
