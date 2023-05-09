export default {
  routes: [
    {
      method: 'GET',
      path: '/user-statistics/findCustom/:id',
      handler: 'custom.findCustom',
    },
  ],
}
