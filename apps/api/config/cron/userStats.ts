import { format } from 'date-fns'

import { getStats } from '../../src/libs'

export default async () => {
  const profiles = (await strapi.entityService.findMany(
    'api::profile.profile',
    {
      filters: {
        user: {
          role: {
            type: {
              $notIn: ['public', 'authenticated'],
            },
          },
        },
      },
      fields: ['id'],
    },
  )) as { id: number }[]

  for (const profile of profiles) {
    const stats = await getStats(profile.id as number)
    const date = format(new Date(), 'yyyy-MM-dd')

    await strapi.entityService.create('api::user-statistic.user-statistic', {
      data: {
        user: profile.id,
        date,
        publishedAt: new Date(),
        stats,
      },
    })
  }
}
