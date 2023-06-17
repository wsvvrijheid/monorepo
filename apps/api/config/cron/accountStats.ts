import { format } from 'date-fns'

import { getAccountStats } from '../../src/libs'

export default async ({ strapi }) => {
  try {
    const accounts = process.env['STATS_ACCOUNTSs']

    if (!accounts) {
      strapi.log.warn('STATS_ACCOUNTS env variable is not set')

      return
    }

    for (const username of accounts.split(',')) {
      const date = format(new Date(), 'yyyy-MM-dd')

      const existing = await strapi.db
        .query('api::account-statistic.account-statistic')
        .findOne({ where: { username, date } })

      // It seems throwing an error in beforeCreate lifecycle is not working
      // There will be a duplicate entry with empty stats data
      if (!existing) {
        const data = await getAccountStats(username, new Date(date))

        await strapi.entityService.create(
          'api::account-statistic.account-statistic',
          {
            data: {
              username: username.toLowerCase(),
              date,
              publishedAt: new Date(),
              ...data,
            },
          },
        )
      }
    }
  } catch (error) {
    console.log('Error updating account statistics', error.message)
  }
}
