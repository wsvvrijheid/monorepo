import { Context } from 'koa'

export default {
  async approve(ctx: Context) {
    await strapi.service('api::art.art').update(ctx.params.id, {
      data: { approvalStatus: 'approved', approver: ctx.state.user.id },
    })
  },
}
