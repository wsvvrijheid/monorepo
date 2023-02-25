export default {
  routes: [
    {
      method: 'PUT',
      path: '/competitions/approve/:id',
      handler: 'custom.approve',
    },
    {
      method: 'PUT',
      path: '/competitions/relation/:id',
      handler: 'custom.relation',
    },
  ],
}
