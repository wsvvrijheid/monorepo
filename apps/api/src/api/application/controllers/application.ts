import { factories } from '@strapi/strapi'
import { assignCreator } from '../../../utils'

export default factories.createCoreController(
  'api::application.application',
  () => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        await assignCreator(ctx, result.id, 'api::application.application')

        return result
      },
    }
  },
)
