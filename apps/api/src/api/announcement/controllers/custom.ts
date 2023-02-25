import { Context } from 'koa'
import { getReferenceModel } from '../../../utils/reference'

export default {
  async approve(ctx: Context) {
    const result = await strapi
      .service('api::announcement.announcement')
      .update(ctx.params.id, {
        data: {
          approvalStatus: 'approved',
          publishedAt: new Date(),
          approver: ctx.state.user.id,
        },
        populate: '*',
      })

    return { data: result }
  },
  async relation(ctx: Context) {
    const id = ctx.params.id

    const currentAnnouncement = await strapi
      .service('api::announcement.announcement')
      .findOne(id, {
        populate: ['localizations.image'],
      })

    const referenceAnnouncement = getReferenceModel(currentAnnouncement)

    const result = await strapi
      .service('api::announcement.announcement')
      .update(id, {
        data: { image: referenceAnnouncement.image?.id },
      })

    return { data: result }
  },
}
