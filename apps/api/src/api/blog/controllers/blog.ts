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
        populate: ['author', 'likers', 'image'],
      })

      const user = ctx.state.user
      const { likes, likers, ...rest } = (await this.sanitizeOutput(
        blog,
        ctx,
      )) as Blog
      const isLiked = user && likers.some(liker => liker.email === user.email)

      return {
        ...rest,
        isLiked: !!isLiked,
        likes: (likes ?? 0) + (likers?.length ?? 0),
      }
    },
    async find(ctx) {
      const response = await super.find(ctx)
      const user = ctx.state.user

      response.data = response.data.map(blog => {
        const { id, attributes } = blog
        const { likes, likers, ...rest } = attributes
        const isLiked =
          user && likers.data.some(liker => liker.email === user.email)
        const data = {
          ...rest,
          isLiked: !!isLiked,
          likes: (likes ?? 0) + (likers?.data?.length ?? 0),
        }

        return {
          id,
          attributes: data,
        }
      })

      return response
    },
  }
})
