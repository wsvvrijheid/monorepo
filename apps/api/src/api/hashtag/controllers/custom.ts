import { Context } from 'koa'
import { twitterApi } from '../../../libs/twitter/client'
import { mapTweetResponseToTweet } from '../../../libs/twitter/getUserTweets'

export default {
  async search(ctx) {
    const result = await twitterApi.v2.search({
      query: ctx.query.q,
      max_results: 50,
      expansions: ['attachments.media_keys'],
      'media.fields': ['url', 'preview_image_url', 'variants'],
      'tweet.fields': ['attachments'],
    })

    const tweetsData = result?.data.data
    const includes = result?.data.includes

    const tweets = mapTweetResponseToTweet(tweetsData, includes)

    ctx.send(tweets)
  },
  async approve(ctx: Context) {
    await strapi.service('api::hashtag.hashtag').update(ctx.params.id, {
      data: { approvalStatus: 'approved', approver: ctx.state.user.id },
    })
  },
}
