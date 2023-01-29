import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::feedback.feedback',
  ({ strapi }) => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        await strapi
          .service('api::feedback.feedback')
          .update(result.data.id, { data: { editor: ctx.state.user.id } })

        return result
      },
    }
  },
)
