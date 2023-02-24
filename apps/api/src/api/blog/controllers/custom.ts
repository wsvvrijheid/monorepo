import { Context } from 'koa'
import { getReferenceModel } from '../../../utils/reference'

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
}
