import { Common } from '@strapi/strapi'
import { errors } from '@strapi/utils'
import { Context } from 'koa'
import { getProfile } from './getProfile'

const { ApplicationError } = errors

export const assignApprover = async <T extends Common.UID.ContentType>(
  ctx: Context,
  uid: T,
  populate?: boolean,
) => {
  const profile = await getProfile(ctx)

  if (!profile) {
    throw new ApplicationError('Profile required')
  }

  const result = await strapi.entityService.update(uid, ctx.params.id, {
    data: {
      approvalStatus: 'approved',
      publishedAt: new Date(),
      approver: profile.id,
    },
    populate: populate ? ['localizations'] : [],
    // TODO: Fix type
  } as never)

  return result
}
