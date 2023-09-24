import { factories } from '@strapi/strapi'
import { assignCreator } from '../../../utils'

export default factories.createCoreController('api::activity.activity', () => {
  return {
    async create(ctx) {
      const result = await super.create(ctx)

      await assignCreator(ctx, result.id, 'api::activity.activity')

      return result
    },
  }
})
