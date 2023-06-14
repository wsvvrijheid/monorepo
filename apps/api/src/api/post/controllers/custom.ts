import { Context } from 'koa'

import { getReferenceModel } from '../../../utils'

export default {
  async approve(ctx: Context) {
    const id = ctx.params.id

    const result = await strapi.entityService.update('api::post.post', id, {
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

    const currentPost = await strapi.entityService.findOne(
      'api::post.post',
      id,
      {
        populate: [
          'localizations.hashtag.localizations',
          'localizations.image',
        ],
      },
    )

    const referencePost = getReferenceModel(currentPost)

    let targetHashtag

    if (referencePost.id !== id) {
      const referenceHashtag = referencePost.hashtag

      targetHashtag = referenceHashtag.localizations?.find(
        hashtag => hashtag.locale === currentPost.locale,
      )
    }

    const result = await strapi.entityService.update('api::post.post', id, {
      data: { hashtag: targetHashtag?.id, image: referencePost.image?.id },
    })

    return { data: result }
  },
}
