import { Context } from 'koa'

export default {
  async approve(ctx: Context) {
    const result = await strapi.service('api::art.art').update(ctx.params.id, {
      data: {
        approvalStatus: 'approved',
        publishedAt: new Date(),
        approver: ctx.state.user.id,
      },
    })

    return { data: result }
  },
  async like(ctx: Context) {
    if (ctx.state.user) {
      const likedArts = await strapi.service('api::art.art').find({
        filters: {
          id: ctx.params.id,
          likers: { id: { $eq: ctx.state.user.id } },
        },
        populate: { likers: true },
      })

      const isLiked = (likedArts['results']?.length || 0) > 0

      if (!isLiked) {
        const singleArt = await strapi
          .service('api::art.art')
          .findOne(ctx.params.id, {
            populate: { likers: true },
          })
        const updatedArt = await strapi
          .service('api::art.art')
          .update(ctx.params.id, {
            data: {
              likes: singleArt.likes + 1,
              likers: [...singleArt.likers, ctx.state.user.id],
            },
          })
        return updatedArt
      }

      const likers = likedArts['results'][0].likers.filter(
        user => user.id != ctx.state.user.id,
      )
      const updatedArt = await strapi
        .service('api::art.art')
        .update(ctx.params.id, {
          data: {
            likes: likedArts['results'][0].likes - 1,
            likers: likers,
          },
        })

      return updatedArt
    }
    const art = await strapi.service('api::art.art').findOne(ctx.params.id, {})

    const updatedArt = await strapi
      .service('api::art.art')
      .update(ctx.params.id, {
        data: {
          likes: art.likes + 1,
        },
      })
      
    return updatedArt
  },
  async view(ctx: Context) {
    const art = await strapi.service('api::art.art').findOne(ctx.params.id, {})

    const updatedArt = await strapi
      .service('api::art.art')
      .update(ctx.params.id, {
        data: {
          views: art.views + 1,
        },
      })
    return updatedArt
  },
}
