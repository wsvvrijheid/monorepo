import { Context } from 'koa'
import { getStats } from '../../../libs'

export default {
  async getMyStats(ctx: Context) {
    const { date, days } = ctx.query

    const { user } = ctx.state
    const stats = await getStats(
      user.id,
      date && new Date(date as string),
      days && parseInt(days as string),
    )

    return {
      data: stats,
    }
  },
  async getStats(ctx: Context) {
    const users = await strapi.entityService.findMany(
      'plugin::users-permissions.user',
      {
        filters: {
          role: {
            type: {
                $notIn: ['public', 'authenticated'],
            },
          },
        },
        // Don't expose sensitive data
        fields: ['id', 'name', 'username'],
      },
    )

    const { date, days } = ctx.query

    const result = await Promise.all(
      users.map(async user => {
        const stats = await getStats(
          user.id,
          date && new Date(date as string),
          days && parseInt(days as string),
        )
        return {
          user,
          stats,
        }
      }),
    )

    return result
  },
}
