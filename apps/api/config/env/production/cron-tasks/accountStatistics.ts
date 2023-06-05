import { format } from 'date-fns'

export default async ({ strapi }) => {
  try {
    const accounts = process.env['STATS_ACCOUNTS']

    if (!accounts) {
      console.log('No accounts found')

      return
    }

    accounts.split(',').map(async username => {
      const date = format(new Date(), 'yyyy-MM-dd')

      // After create lifecycle will update it with the stats
      await strapi.service('api::account-statistic.account-statistic').create({
        data: {
          username: username.toLowerCase(),
          date,
          publishedAt: new Date(),
        },
      })
    })
  } catch (error) {
    console.log('Error updating account statistics', error.message)
  }
}
