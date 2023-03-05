import { syncNews } from '../../../libs'

export default {
  async sync(ctx) {
    const result = await syncNews({ strapi })
    ctx.send({ count: result })
  },
}
