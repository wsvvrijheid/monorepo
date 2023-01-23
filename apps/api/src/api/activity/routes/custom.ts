export default {
  routes: [
    {
      method: 'PUT',
      path: '/activities/approve/:id',
      handler: 'custom.approve',
    },
  ],
}
