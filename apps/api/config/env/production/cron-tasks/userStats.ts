import { getStats } from '../../../../src/libs'

export default async ({ strapi }) => {
  let userStatArr = []
  const users = await strapi.plugins['users-permissions'].services.user.fetchAll()

  for (const user of users) {
    userStatArr.push(await getStats(user.id))
  }

  return userStatArr
}
