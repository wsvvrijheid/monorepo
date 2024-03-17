import { factories } from '@strapi/strapi'
import { assignCreator, getProfile } from '../../../utils'
import { Blog } from '@fc/types'

export default factories.createCoreController('api::blog.blog', () => {
  return {
    async create(ctx) {
      const profile = await getProfile(ctx, true)

      const result = await super.create(ctx)

      await assignCreator(profile, result?.data?.id, 'api::blog.blog')

      return result
    },
    async findOne(ctx) {
      const { id } = ctx.params
      const slug = id ? id : ctx.params.slug

      const blog = await strapi.db.query('api::blog.blog').findOne({
        where: { slug },
        populate: ['author', 'image'],
      })

      const user = ctx.state.user
      const sanitizedBlog = (await this.sanitizeOutput(blog, ctx)) as Blog

      const isLiked =
        user &&
        (await strapi.db.query('api::blog.blog').findOne({
          where: {
            slug,
            likers: {
              email: user.email,
            },
          },
          select: ['id'],
        }))

      return {
        ...sanitizedBlog,
        isLiked: !!isLiked,
      }
    },
    async find(ctx) {
      const response = await super.find(ctx)
      const user = ctx.state.user

      const data = []
      for (const blog of response.data) {
        const { id, attributes } = blog

        const isLiked =
          user &&
          (await strapi.db.query('api::blog.blog').findOne({
            where: {
              id,
              likers: {
                email: user.email,
              },
            },
            select: ['id'],
          }))

        data.push({
          id,
          attributes: {
            ...attributes,
            isLiked: !!isLiked,
          },
        })
      }

      response.data = data
      return response
    },
  }
})
