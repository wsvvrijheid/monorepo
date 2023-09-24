import { Common } from '@strapi/strapi'
import { getProfile } from './getProfile'
import { errors } from '@strapi/utils'
import { Context } from 'koa'

const { ApplicationError } = errors

export const assignCreator = async <T extends Common.UID.ContentType>(
  ctx: Context,
  id: number,
  uid: T,
) => {
  const profile = await getProfile(ctx)

  if (!profile) {
    throw new ApplicationError('Profile required')
  }

  await strapi.entityService.update(uid, id, {
    // TODO: Fix type
    data: { creator: profile?.id } as never,
  })
}
