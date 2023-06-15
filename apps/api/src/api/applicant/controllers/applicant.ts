import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::applicant.applicant',
  ({ strapi }) => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        await strapi.entityService.update(
          'api::applicant.applicant',
          result.data.id,
          { data: { user: ctx.state.user.id } },
        )

        return result
      },
    }
  },
)
