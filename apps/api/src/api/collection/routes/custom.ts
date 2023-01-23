export default {
  routes: [
    {
      method: 'PUT',
      path: '/collections/approve/:id',
      handler: 'custom.approve',
    },
  ],
}
