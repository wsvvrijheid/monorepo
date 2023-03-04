import { getUserTweets } from '../../../libs'

export default {
  async updateTweets(ctx) {
    const { id } = ctx.params

    const tweets = await getUserTweets(id)

    return tweets
  },
}
