export default {
  routes: [
    {
      method: 'PUT',
      path: '/blogs/approve/:id',
      handler: 'custom.approve',
    },
    {
      method: 'PUT',
      path: '/blogs/relation/:id',
      handler: 'custom.relation',
    },
    {
      method: 'GET',
      path: '/authors',
      handler: 'custom.getAuthors',
    },
  ],
}
