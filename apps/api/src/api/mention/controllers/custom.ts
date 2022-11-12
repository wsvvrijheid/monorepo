import { twitterApi } from '../../../libs/twitter/client'

export default {
  async search(ctx) {
    const result = await twitterApi.v1.searchUsers(ctx.query.q)
    ctx.send(result.data)
  },
}
