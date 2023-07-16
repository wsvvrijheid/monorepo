import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::blog.blog',
  ({ strapi }) => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        if (!ctx.state.user) {
          return result
        }

        await strapi.entityService.update('api::blog.blog', result.data.id, {
          data: { creator: ctx.state.user.id },
        })

        return result
      },
    }
  },
)
