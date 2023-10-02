/* eslint-disable @typescript-eslint/no-explicit-any */
import { factories } from '@strapi/strapi'
import { checkRecaptcha, getProfile } from '../../../utils'

export default factories.createCoreController('api::comment.comment', () => {
  return {
    async create(ctx) {
      await checkRecaptcha(ctx)

      const profile = await getProfile(ctx)

      const result = await strapi.entityService.create('api::comment.comment', {
        data: {
          ...(ctx.request as any).body?.data,
          profile: profile?.id,
        },
      })

      return result
    },
  }
})
