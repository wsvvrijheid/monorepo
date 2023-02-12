import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::hashtag.hashtag',
  ({ strapi }) => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        await strapi
          .service('api::hashtag.hashtag')
          .update(result.data.id, { data: { creator: ctx.state.user.id } })

        return result
      },
    }
  },
)
