import { Context } from 'koa'

export const getProfile = async (ctx: Context) => {
  const profileResponse = await strapi.entityService.findMany(
    'api::profile.profile',
    {
      filters: {
        user: { id: ctx.state.user.id },
      },
    },
  )

  const profile = profileResponse?.[0] || null

  return profile
}
