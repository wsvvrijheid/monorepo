import { getUserTweets } from '../../../libs/twitter/getUserTweets'

export default {
  async updateTweets(ctx) {
    const { id } = ctx.params

    const tweets = await getUserTweets(id)

    return tweets
  },
}
