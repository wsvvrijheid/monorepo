import { format } from 'date-fns'

import { getStats } from '../../../../src/libs'

export default async ({ strapi }) => {
  const users = await strapi.entityManager.findMany(
    'plugin::users-permissions.user',
    {
      filters: {
        role: {
          type: {
            $notIn: ['public', 'authenticated'],
          },
        },
      },
      fields: ['id'],
    },
  )

  for (const user of users) {
    const stats = await getStats(user.id)
    const date = format(new Date(), 'yyyy-MM-dd')

    await strapi.entityManager.create('api::user-statistic.user-statistic', {
      data: {
        user: user.id,
        date,
        publishedAt: new Date(),
        stats,
      },
    })
  }
}
