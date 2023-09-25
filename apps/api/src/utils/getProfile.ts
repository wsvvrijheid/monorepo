import { Context } from 'koa'
import { errors } from '@strapi/utils'

const { ApplicationError, UnauthorizedError } = errors

export const getProfile = async (ctx: Context, check?: boolean) => {
  if (!ctx.state.user) {
    throw new UnauthorizedError('Not authenticated')
  }

  const profileResponse = await strapi.entityService.findMany(
    'api::profile.profile',
    {
      filters: {
        user: { id: { $eq: ctx.state.user.id } },
      },
    },
  )

  const profile = profileResponse?.[0] || null

  if (check && !profile) {
    throw new ApplicationError('Profile required')
  }

  return profile
}
