import syncTopics from '../../../libs/topics'

export default {
  async sync(ctx) {
    const result = await syncTopics({ strapi })
    ctx.send({ count: result })
  },
}
