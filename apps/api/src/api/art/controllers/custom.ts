/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'koa'
import { checkRecaptcha, getProfile } from '../../../utils'
import { errors } from '@strapi/utils'

const { ApplicationError, ForbiddenError } = errors

export default {
  async approve(ctx: Context) {
    const result = await strapi.entityService.update(
      'api::art.art',
      ctx.params.id,
      {
        data: {
          approvalStatus: 'approved',
          publishedAt: new Date(),
          // approver: ctx.state.user.id,
        },
      },
    )

    return { data: result }
  },
  async like(ctx: Context) {
    await checkRecaptcha(ctx)

    const profile = await getProfile(ctx)

    if (profile) {
      const isLikedCount = await strapi.entityService.count('api::art.art', {
        filters: {
          id: { $eq: ctx.params.id },
          likers: { id: { $in: [profile.id] } },
        },
      })

      const connection = isLikedCount > 0 ? 'disconnect' : 'connect'

      const result = await strapi.entityService.update(
        'api::art.art',
        ctx.params.id,
        {
          data: {
            likers: {
              [connection]: [profile.id as number],
            } as any,
          },
        },
      )

      return { data: result }
    }

    await strapi.db
      .connection('arts')
      .where('id', ctx.params.id)
      .increment('likes', 1)

    const result = await strapi.entityService.findOne(
      'api::art.art',
      ctx.params.id,
    )

    return { data: result }
  },
  async unlike(ctx: Context) {
    await checkRecaptcha(ctx)

    await strapi.db
      .connection('arts')
      .where('id', ctx.params.id)
      .increment('likes', -1)

    const result = await strapi.entityService.findOne(
      'api::art.art',
      ctx.params.id,
    )

    return { data: result }
  },
  async view(ctx: Context) {
    try {
      await checkRecaptcha(ctx)

      await strapi.db
        .connection('arts')
        .where('id', ctx.params.id)
        .increment('views', 1)

      const result = await strapi.entityService.findOne(
        'api::art.art',
        ctx.params.id,
      )

      return { data: result }
    } catch (error) {
      console.error('Error in view-art controller:', error)

      if (error instanceof ForbiddenError)
        throw new ForbiddenError(error.message)

      throw new ApplicationError(error.message)
    }
  },
}
