import { getAccountStats } from '../../../../src/libs'

export default async ({ strapi }) => {
  try {
    const accounts = process.env['STATS_ACCOUNTS'] || ''

    accounts.split(',').map(async username => {
      const stats = await getAccountStats(username)

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
