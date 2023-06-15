import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::announcement.announcement',
  ({ strapi }) => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        await strapi.entityService.update(
          'api::announcement.announcement',
          result.data.id,
          { data: { creator: ctx.state.user.id } },
        )

        return result
      },
    }
  },
)
