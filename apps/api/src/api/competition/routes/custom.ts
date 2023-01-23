export default {
  routes: [
    {
      method: 'PUT',
      path: '/competitions/approve/:id',
      handler: 'custom.approve',
    },
  ],
}
