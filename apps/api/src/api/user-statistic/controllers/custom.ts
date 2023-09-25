import { Context } from 'koa'

import { getStats } from '../../../libs'

export default {
  async getMyStats(ctx: Context) {
    const { date, days } = ctx.query

    const { user } = ctx.state

    const getProfiles = await strapi.entityService.findMany(
      'api::profile.profile',
      { filters: { user: { id: { $eq: user.id } } } },
    )

    const profile = getProfiles[0]

    if (!profile) {
      return {
        data: null,
      }
    }

    const stats = await getStats(
      Number(profile.id),
      date && new Date(date as string),
      days && parseInt(days as string),
    )

    return {
      data: stats,
    }
  },
  async getStats(ctx: Context) {
    const users = await strapi.entityService.findMany('api::profile.profile', {
      filters: {
        user: {
          role: {
            type: {
              $notIn: ['public', 'authenticated'],
            },
          },
        },
      },
      populate: ['user.role'],
    })

    const { date, days } = ctx.query

    const result = await Promise.all(
      users.map(async user => {
        const stats = await getStats(
          Number(user.id),
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
