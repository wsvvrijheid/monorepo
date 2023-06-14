import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::collection.collection',
  ({ strapi }) => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        await strapi.entityService.update(
          'api::collection.collection',
          result.data.id,
          { data: { creator: ctx.state.user.id } },
        )

        return result
      },
    }
  },
)
