import { factories } from '@strapi/strapi'
import { assignCreator, getProfile } from '../../../utils'

export default factories.createCoreController('api::hashtag.hashtag', () => {
  return {
    async create(ctx) {
      const profile = await getProfile(ctx, true)

      const result = await super.create(ctx)

      await assignCreator(profile, result?.data?.id, 'api::hashtag.hashtag')

      return result
    },
  }
})
