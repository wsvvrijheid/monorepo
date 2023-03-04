import { twitterApi } from '../../../libs'

export default {
  async search(ctx) {
    const result = await twitterApi.v1.searchUsers(ctx.query.q)
    ctx.send(result.data)
  },
}
