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
  ],
}
