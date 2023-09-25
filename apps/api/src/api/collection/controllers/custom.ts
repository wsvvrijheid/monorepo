import { Context } from 'koa'
import { assignApprover } from '../../../utils'

export default {
  async approve(ctx: Context) {
    const result = await assignApprover(ctx, 'api::collection.collection', true)

    return { data: result }
  },
}
