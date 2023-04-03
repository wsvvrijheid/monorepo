import { twitterApi } from '../../../libs'

export default {
  async search(ctx) {
    try {
      const result = await twitterApi.v1.searchUsers(ctx.query.q)
      ctx.send(result.data)
    } catch (error) {
      console.error('Error searching users', error.message)
    }
  },
}
