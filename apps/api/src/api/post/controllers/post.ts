import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::post.post',
  ({ strapi }) => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        await strapi.entityService.update('api::post.post', result.data.id, {
          data: { creator: ctx.state.user.id },
        })

        return result
      },
    }
  },
)
