import { syncNews } from '../../../libs'

export default {
  async sync(ctx) {
    const result = await syncNews()

    ctx.send(result)
  },
}
