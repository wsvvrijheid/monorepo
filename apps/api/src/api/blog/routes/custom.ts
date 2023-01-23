export default {
  routes: [
    {
      method: 'PUT',
      path: '/blogs/approve/:id',
      handler: 'custom.approve',
    },
  ],
}
