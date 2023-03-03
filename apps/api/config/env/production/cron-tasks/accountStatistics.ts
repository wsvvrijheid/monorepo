import { getAccountStats } from '../../../../src/libs/twitter/getAccountStats'

export default async ({ strapi }) => {
  try {
    const accounts = process.env['Accounts'] as string
  
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
