import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::art.art', ({ strapi }) => ({
  create: async ctx => {
    const body = ctx.request.body as any

    const data = JSON.parse(body.data)

    const modelToBeCreated = {
      data: {
        ...data,
        creator: ctx.state.user.id,
      },
    }

    const entity = await strapi.service('api::art.art').create(modelToBeCreated)

    ctx.created(entity)

    return entity
  },
}))
