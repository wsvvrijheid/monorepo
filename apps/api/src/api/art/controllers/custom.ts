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
      const art = await strapi.service('api::art.art').findOne(ctx.params.id, {
        populate: {
          likers: true,
        },
      })
      const isLiked = art.likers.filter(user => user.id == ctx.state.user.id)

      if (isLiked.length === 0) {
        const likers = [...art.likers]
        likers.push(ctx.state.user)
        const updatedArt = await strapi
          .service('api::art.art')
          .update(ctx.params.id, {
            data: {
              likers: likers,
              likes: art.likes + 1,
            },
          })

        return updatedArt
      } else {
        const likers = art.likers.filter(user => user.id != ctx.state.user.id)
        const updatedArt = await strapi
          .service('api::art.art')
          .update(ctx.params.id, {
            data: {
              likers: likers,
              likes: art.likes - 1,
            },
          })

        return updatedArt
      }
    } else {
      const art = await strapi
        .service('api::art.art')
        .findOne(ctx.params.id, {})

      const updatedArt = await strapi
        .service('api::art.art')
        .update(ctx.params.id, {
          data: {
            likes: art.likes + 1,
          },
        })
      return updatedArt
    }
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
