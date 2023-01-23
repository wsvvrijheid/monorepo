import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::announcement.announcement',
  () => ({
    async create(ctx) {
      Object.assign((ctx.request.body as any).data, {
        creator: ctx.state.user.id,
      })

      return super.create(ctx)
    },
  }),
)
