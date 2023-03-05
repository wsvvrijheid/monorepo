import { factories } from '@strapi/strapi'
import { getReferenceModel } from '../../../utils'

export default factories.createCoreController(
  'api::competition.competition',
  ({ strapi }) => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        await strapi
          .service('api::competition.competition')
          .update(result.data.id, { data: { creator: ctx.state.user.id } })

        return result
      },
      async relation(ctx) {
        const id = ctx.params.id

        const currentCompetition = await strapi
          .service('api::competition.competition')
          .findOne(id, {
            populate: ['localizations.image'],
          })

        const referenceCompetition = getReferenceModel(currentCompetition)

        const result = await strapi
          .service('api::competition.competition')
          .update(id, {
            data: { image: referenceCompetition.image?.id },
          })

        return { data: result }
      },
    }
  },
)
