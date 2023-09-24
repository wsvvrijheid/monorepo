import { factories } from '@strapi/strapi'
import { assignCreator } from '../../../utils'

export default factories.createCoreController(
  'api::collection.collection',
  () => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        await assignCreator(ctx, result.id, 'api::collection.collection')

        return result
      },
    }
  },
)
