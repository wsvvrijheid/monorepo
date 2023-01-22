import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', () => ({
  async create(ctx) {
    Object.assign((ctx.request.body as any).data, {
      creator: ctx.state.user.id,
    })

    return super.create(ctx)
  },
}))
