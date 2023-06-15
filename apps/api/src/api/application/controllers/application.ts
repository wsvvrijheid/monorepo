import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::application.application',
  ({ strapi }) => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        await strapi.entityService.update(
          'api::application.application',
          result.data.id,
          { data: { creator: ctx.state.user.id } },
        )

        return result
      },
    }
  },
)
