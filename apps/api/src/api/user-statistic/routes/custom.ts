export default {
  routes: [
    {
      method: 'GET',
      path: '/user-statistics/get-user-stats',
      handler: 'custom.getMyStats',
    },
    {
      method: 'GET',
      path: '/user-statistics/get-stats',
      handler: 'custom.getStats',
    },
  ],
}
