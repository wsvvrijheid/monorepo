import { Context } from 'koa'

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
}
