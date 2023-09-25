import { factories } from '@strapi/strapi'
import { assignCreator, getProfile } from '../../../utils'

export default factories.createCoreController(
  'api::recommended-tweet.recommended-tweet',
  () => {
    return {
      async create(ctx) {
        const profile = await getProfile(ctx, true)

        const result = await super.create(ctx)

        await assignCreator(
          profile,
          result.id,
          'api::recommended-tweet.recommended-tweet',
        )

        return result
      },
    }
  },
)
