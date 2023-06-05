import { Context } from 'koa'

import { twitterApi } from '../../../libs'
import { getReferenceModel, mapTweetV2ResponseToTweet } from '../../../utils'

export default {
  async search(ctx) {
    try {
      const result = await twitterApi.v2.search({
        query: ctx.query.q as string,
        max_results: 50,
        expansions: ['attachments.media_keys'],
        'media.fields': ['url', 'preview_image_url', 'variants'],
        'tweet.fields': ['attachments'],
      })

      const tweetsData = result?.data.data
      const includes = result?.data.includes

      const tweets = mapTweetV2ResponseToTweet(tweetsData, includes)

      ctx.send(tweets)
    } catch (error) {
      console.error('Error searching hashtags', error.message)
      ctx.send([])
    }
  },
  async approve(ctx: Context) {
    const result = await strapi
      .service('api::hashtag.hashtag')
      .update(ctx.params.id, {
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

    const currentHashtag = await strapi
      .service('api::hashtag.hashtag')
      .findOne(id, {
        populate: ['localizations.image'],
      })

    const referenceHashtag = getReferenceModel(currentHashtag)

    const result = await strapi.service('api::hashtag.hashtag').update(id, {
      data: { image: referenceHashtag.image?.id },
    })

    return { data: result }
  },
}
