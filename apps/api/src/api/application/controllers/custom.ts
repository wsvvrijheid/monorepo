import { Context } from 'koa'
import { assignApprover } from '../../../utils'

export default {
  async approve(ctx: Context) {
    const result = await assignApprover(ctx, 'api::application.application')

    return { data: result }
  },
}
