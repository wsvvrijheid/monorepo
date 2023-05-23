import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::activity.activity',
  ({ strapi }) => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        await strapi
          .service('api::activity.activity')
          .update(result.data.id, { data: { creator: ctx.state.user.id } })

        return result
      },
    }
  },
)
