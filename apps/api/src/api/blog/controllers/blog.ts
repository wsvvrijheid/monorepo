import { factories } from '@strapi/strapi'
import { assignCreator, getProfile } from '../../../utils'

export default factories.createCoreController('api::blog.blog', () => {
  return {
    async create(ctx) {
      const profile = await getProfile(ctx, true)

      const result = await super.create(ctx)

      await assignCreator(profile, result?.data?.id, 'api::blog.blog')

      return result
    },
    async find(ctx) {
      const result = await super.find(ctx)
      const user = ctx.state.user
      for (const blog of result.data) {
        const attr = blog.attributes
        const { likers, likes, ...others } = attr
        const isLiked =
          user &&
          likers?.data?.some(liker => liker.attributes.email === user.email)
        blog.attributes = {
          ...others,
          isLiked: !!isLiked,
          likes: (likes ?? 0) + (likers?.data?.length ?? 0),
        }
      }
      return result
    },
  }
})
