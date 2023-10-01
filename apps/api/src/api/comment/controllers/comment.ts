/* eslint-disable @typescript-eslint/no-explicit-any */
import { factories } from '@strapi/strapi'
import { assignCreator, checkRecaptcha, getProfile } from '../../../utils'

export default factories.createCoreController('api::comment.comment', () => {
  return {
    async create(ctx) {
      await checkRecaptcha(ctx)

      const profile = await getProfile(ctx)
      const result = await super.create(ctx)

      if (profile) {
        await assignCreator(
          profile,
          result.data.id,
          'api::comment.comment',
          'profile',
        )
      }

      return result
    },
  }
})
