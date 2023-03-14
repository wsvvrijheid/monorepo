import { Context } from 'koa'
import { getReferenceModel } from '../../../utils'

export default {
  async approve(ctx: Context) {
    const result = await strapi
      .service('api::blog.blog')
      .update(ctx.params.id, {
        data: {
          approvalStatus: 'approved',
          publishedAt: new Date(),
          approver: ctx.state.user.id,
        },
      })

    return { data: result }
  },
  async relation(ctx: Context) {
    const id = ctx.params.id

    const currentBlog = await strapi.service('api::blogs.blogs').findOne(id, {
      populate: ['localizations.image'],
    })

    const referenceBlog = getReferenceModel(currentBlog)

    const result = await strapi.service('api::blogs.blogs').update(id, {
      data: { image: referenceBlog.image?.id },
    })

    return { data: result }
  },
  async like(ctx: Context) {
    if (ctx.state.user) {
      const blog = await strapi
        .service('api::blog.blog')
        .findOne(ctx.params.id, {
          populate: {
            likers: true,
          },
        })
      const isLiked = blog.likers.filter(user => user.id == ctx.state.user.id)

      if (isLiked.length === 0) {
        const likers = [...blog.likers]
        likers.push(ctx.state.user)
        const updatedBlog = await strapi
          .service('api::blog.blog')
          .update(ctx.params.id, {
            data: {
              likers: likers,
              likes: blog.likes + 1,
            },
          })

        return updatedBlog
      } else {
        const likers = blog.likers.filter(user => user.id != ctx.state.user.id)
        const updatedBlog = await strapi
          .service('api::blog.blog')
          .update(ctx.params.id, {
            data: {
              likers: likers,
              likes: blog.likes - 1,
            },
          })

        return updatedBlog
      }
    } else {
      const blog = await strapi
        .service('api::blog.blog')
        .findOne(ctx.params.id, {})

      const updatedBlog = await strapi
        .service('api::blog.blog')
        .update(ctx.params.id, {
          data: {
            likes: blog.likes + 1,
          },
        })
      return updatedBlog
    }
  },
  async view(ctx: Context) {
    const blog = await strapi
      .service('api::blog.blog')
      .findOne(ctx.params.id, {})

    const updatedBlog = await strapi
      .service('api::blog.blog')
      .update(ctx.params.id, {
        data: {
          views: blog.views + 1,
        },
      })
    return updatedBlog
  },
}
