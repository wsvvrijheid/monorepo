import { Context } from 'koa'

import { getReferenceModel } from '../../../utils'

export default {
  async approve(ctx: Context) {
    const result = await strapi.entityService.update(
      'api::blog.blog',
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
  async relation(ctx: Context) {
    const id = ctx.params.id

    const currentBlog = await strapi.entityService.findOne(
      'api::blogs.blogs',
      id,
      {
        populate: ['localizations.image'],
      },
    )

    const referenceBlog = getReferenceModel(currentBlog)

    const result = await strapi.entityService.update('api::blogs.blogs', id, {
      data: { image: referenceBlog.image?.id },
    })

    return { data: result }
  },
   async author() {
    console.log("author ");
    

    // const authors = await strapi.entityService.findMany('plugin::users-permissions.user')

    // const id = ctx.params.id;

    const user = await strapi.plugins['users-permissions'].controller('user')
    
    console.log(user);
    

    return {data: []}
    
  }

}
