import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::recommended-tweet.recommended-tweet',
  ({ strapi }) => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        await strapi
          .service('api::recommended-tweet.recommended-tweet')
          .update(result.data.id, { data: { creator: ctx.state.user.id } })

        return result
      },
    }
  },
)
