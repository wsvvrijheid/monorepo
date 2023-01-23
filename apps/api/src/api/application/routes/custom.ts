export default {
  routes: [
    {
      method: 'PUT',
      path: '/applications/approve/:id',
      handler: 'custom.approve',
    },
  ],
}
