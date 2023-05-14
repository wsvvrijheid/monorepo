export default {
  routes: [
    {
      method: 'GET',
      path: '/user-statistics/get-stats/me',
      handler: 'custom.getMyStats',
    },
    {
      method: 'GET',
      path: '/user-statistics/get-stats',
      handler: 'custom.getStats',
    },
  ],
}
