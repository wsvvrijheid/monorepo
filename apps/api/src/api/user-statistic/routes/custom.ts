export default {
  routes: [
    {
      method: 'GET',
      path: '/user-statistics/',
      handler: 'custom.getMyStats',
    },
    {
      method: 'GET',
      path: '/user-statistics/get-stats',
      handler: 'custom.getStats',
    },
  ],
}
