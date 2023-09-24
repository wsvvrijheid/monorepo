import { factories } from '@strapi/strapi'

import { assignCreator, getReferenceModel } from '../../../utils'

export default factories.createCoreController(
  'api::competition.competition',
  () => {
    return {
      async create(ctx) {
        const result = await super.create(ctx)

        await assignCreator(ctx, result.id, 'api::competition.competition')

        return result
      },
      async relation(ctx) {
        const id = ctx.params.id

        const currentCompetition = await strapi.entityService.findOne(
          'api::competition.competition',
          id,
          {
            populate: ['localizations.image'],
          },
        )

        const referenceCompetition = getReferenceModel(currentCompetition)

        const result = await strapi.entityService.update(
          'api::competition.competition',
          id,
          {
            data: { image: referenceCompetition.image?.id },
          },
        )

        return { data: result }
      },
    }
  },
)
