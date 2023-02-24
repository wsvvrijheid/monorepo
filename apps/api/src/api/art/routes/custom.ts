export default {
  routes: [
    {
      method: 'PUT',
      path: '/arts/approve/:id',
      handler: 'custom.approve',
    },
  ],
}
