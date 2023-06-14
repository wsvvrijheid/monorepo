import { Context } from 'koa'

import { getReferenceModel } from '../../../utils'

export default {
  async approve(ctx: Context) {
    const result = await strapi.entityService.update(
      'api::announcement.announcement',
      ctx.params.id,
      {
        data: {
          approvalStatus: 'approved',
          publishedAt: new Date(),
          approver: ctx.state.user.id,
        },
        populate: '*',
      },
    )

    return { data: result }
  },
  async relation(ctx: Context) {
    const id = ctx.params.id

    const currentAnnouncement = await strapi.entityService.findOne(
      'api::announcement.announcement',
      id,
      {
        populate: ['localizations.image'],
      },
    )

    const referenceAnnouncement = getReferenceModel(currentAnnouncement)

    const result = await strapi.entityService.update(
      'api::announcement.announcement',
      id,
      {
        data: { image: referenceAnnouncement.image?.id },
      },
    )

    return { data: result }
  },
}
