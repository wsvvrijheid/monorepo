import { getAccountStats } from '../../../../src/libs'

export default async ({ strapi }) => {
  try {
    const accounts = process.env['STATS_ACCOUNTS']

    if (!accounts) {
      console.log('No accounts found')
      return
    }

    accounts.split(',').map(async username => {
      const stats = await getAccountStats(username)

      if (!stats) {
        console.log('No stats found for ', username)
        return
      }

      await strapi.service('api::account-statistic.account-statistic').create({
        data: stats,
      })
    })
  } catch (error) {
    console.log(
      'Error updating account statistics',
      error?.response || error.message,
    )
  }
}
