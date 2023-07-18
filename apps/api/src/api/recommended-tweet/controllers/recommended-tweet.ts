import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::recommended-tweet.recommended-tweet',
  ({ strapi }) => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        if (ctx.state?.user?.id) {
          await strapi.entityService.update(
            'api::recommended-tweet.recommended-tweet',
            result.data.id,
            { data: { creator: ctx.state.user.id } },
          )
        }

        return result
      },
    }
  },
)
