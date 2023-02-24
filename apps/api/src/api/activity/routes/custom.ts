export default {
  routes: [
    {
      method: 'PUT',
      path: '/activities/approve/:id',
      handler: 'custom.approve',
    },
    {
      method: 'PUT',
      path: '/activities/relation/:id',
      handler: 'custom.relation',
    },
  ],
}
