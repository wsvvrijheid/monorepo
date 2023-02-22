export default {
  routes: [
    {
      method: 'GET',
      path: '/hashtags/search',
      handler: 'custom.search',
    },
    {
      method: 'PUT',
      path: '/hashtags/approve/:id',
      handler: 'custom.approve',
    },
    {
      method: 'PUT',
      path: '/hashtags/relation/:id',
      handler: 'custom.relation',
    },
  ],
}
