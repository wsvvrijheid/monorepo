import { factories } from '@strapi/strapi'
import { assignCreator } from '../../../utils'

export default factories.createCoreController(
  'api::recommended-tweet.recommended-tweet',
  () => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        await assignCreator(
          ctx,
          result.id,
          'api::recommended-tweet.recommended-tweet',
        )

        return result
      },
    }
  },
)
