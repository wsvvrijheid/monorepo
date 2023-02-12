import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::art.art', ({ strapi }) => {
  return {
    async create(ctx) {
      const result = await super.create(ctx)

      await strapi
        .service('api::art.art')
        .update(result.data.id, { data: { artist: ctx.state.user.id } })

      return result
    },
  }
})
