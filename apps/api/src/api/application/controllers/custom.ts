import { Context } from 'koa'

export default {
  async approve(ctx: Context) {
    const result = await strapi.entityService.update(
      'api::application.application',
      ctx.params.id,
      {
        data: {
          approvalStatus: 'approved',
          publishedAt: new Date(),
          approver: ctx.state.user.id,
        },
      },
    )

    return { data: result }
  },
}
