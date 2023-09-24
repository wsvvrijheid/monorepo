import { Common } from '@strapi/strapi'
import { Context } from 'koa'

export const assignApprover = async <T extends Common.UID.ContentType>(
  ctx: Context,
  uid: T,
  populate?: boolean,
) => {
  const result = await strapi.entityService.update(uid, ctx.params.id, {
    data: {
      approvalStatus: 'approved',
      publishedAt: new Date(),
      approver: ctx.state.user.id,
    },
    populate: populate ? ['localizations'] : [],
    // TODO: Fix type
  } as never)

  return result
}
