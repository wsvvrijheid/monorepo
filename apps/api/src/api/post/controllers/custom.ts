import { Context } from 'koa'
import { getReferenceModel } from '../../../utils/reference'

export default {
  async approve(ctx: Context) {
    const id = ctx.params.id

    const result = await strapi.service('api::post.post').update(id, {
      data: {
        approvalStatus: 'approved',
        publishedAt: new Date(),
        approver: ctx.state.user.id,
      },
      populate: ['localizations'],
    })

    return { data: result }
  },
  async relation(ctx: Context) {
    const id = ctx.params.id

    const currentPost = await strapi.service('api::post.post').findOne(id, {
      populate: ['localizations.hashtag', 'localizations.image'],
    })

    const referencePost = getReferenceModel(currentPost)

    let targetHashtag

    if (referencePost.id !== id) {
      const hashtagsResponse = await strapi.entityService.findMany(
        'api::hashtag.hashtag',
        {
          filters: {
            locale: currentPost.locale,
            localizations: { id: referencePost.hashtag.id },
          },
        },
      )

      targetHashtag = hashtagsResponse?.[0]
    }

    const result = await strapi.service('api::post.post').update(id, {
      data: { hashtag: targetHashtag?.id, image: referencePost.image?.id },
    })

    return { data: result }
  },
}
