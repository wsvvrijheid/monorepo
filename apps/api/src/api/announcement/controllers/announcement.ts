import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::announcement.announcement',
  ({ strapi }) => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        await strapi
          .service('api::announcement.announcement')
          .update(result.data.id, { data: { creator: ctx.state.user.id } })

        return result
      },
    }
  },
)
