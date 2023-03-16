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
      const likedBlogs = await strapi.service('api::blog.blog').find({
        filters: {
          id: ctx.params.id,
          likers: { id: { $eq: ctx.state.user.id } },
        },
        populate: { likers: true },
      })

      const isLiked = (likedBlogs['results']?.length || 0) > 0

      if (!isLiked) {
        const singleBlog = await strapi
          .service('api::blog.blog')
          .findOne(ctx.params.id, {
            populate: { likers: true },
          })
        const updatedBlog = await strapi
          .service('api::blog.blog')
          .update(ctx.params.id, {
            data: {
              likes: singleBlog.likes + 1,
              likers: [...singleBlog.likers, ctx.state.user.id],
            },
          })
          
        return updatedBlog
      }

      const likers = likedBlogs['results'][0].likers.filter(
        user => user.id != ctx.state.user.id,
      )
      const updatedBlog = await strapi
        .service('api::blog.blog')
        .update(ctx.params.id, {
          data: {
            likes: likedBlogs['results'][0].likes - 1,
            likers: likers,
          },
        })

      return updatedBlog
    }
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
