import { Context } from 'koa'
import { getStats } from '../../../libs'


export default {
  async findCustom(ctx: Context) {
    const { user } = ctx.state
    const stats = await getStats(user.id)

    const postsCreatedByUser = {
        user: user.id,
        type: 'creator',
        count: stats.creatorCount,
        date: new Date(),
      }

    const postsApprovedByUser = {
        user: user.id,
        type: 'approver',
        count: stats.approverCount,
        date: new Date(),
      }

    return {
      data: {
        postsCreatedByUser,
        postsApprovedByUser,
      },
    }
  },
}
