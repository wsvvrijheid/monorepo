import { Context } from 'koa'

import { getReferenceModel } from '../../../utils'

export default {
  async approve(ctx: Context) {
    const result = await strapi
      .service('api::activity.activity')
      .update(ctx.params.id, {
        data: {
          approvalStatus: 'approved',
          publishedAt: new Date(),
          approver: ctx.state.user.id,
        },
        populate: ['localizations'],
      })

    return { data: result }
  },
  async relation(ctx: Context) {
    const id = ctx.params.id

    const currentActivity = await strapi
      .service('api::activity.activity')
      .findOne(id, {
        populate: ['localizations.image'],
      })

    const referenceActivity = getReferenceModel(currentActivity)

    const result = await strapi.service('api::activity.activity').update(id, {
      data: { image: referenceActivity.image?.id },
    })

    return { data: result }
  },
}
