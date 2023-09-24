import { factories } from '@strapi/strapi'
import { assignCreator } from '../../../utils'

export default factories.createCoreController('api::post.post', () => {
  return {
    async create(ctx) {
      const result = await super.create(ctx)

      await assignCreator(ctx, result.id, 'api::post.post')

      return result
    },
  }
})
