import { Context } from 'koa'

import { assignApprover, getReferenceModel } from '../../../utils'

export default {
  async approve(ctx: Context) {
    const result = await assignApprover(ctx, 'api::blog.blog', true)

    return { data: result }
  },
  async relation(ctx: Context) {
    const id = ctx.params.id

    const currentBlog = await strapi.entityService.findOne(
      'api::blog.blog',
      id,
      {
        populate: ['localizations.image'],
      },
    )

    const referenceBlog = getReferenceModel(currentBlog)

    const result = await strapi.entityService.update('api::blog.blog', id, {
      data: { image: referenceBlog.image?.id },
    })

    return { data: result }
  },
  async getAuthors() {
    const user = await strapi.entityService.findMany(
      'plugin::users-permissions.user',
      {
        filters: {
          role: {
            type: {
              $containsi: 'author',
            },
          },
        },
      },
    )

    return { data: user }
  },
}
