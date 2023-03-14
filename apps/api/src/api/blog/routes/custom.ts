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
      method: 'PUT',
      path: '/blogs/like/:id',
      handler: 'custom.like',
    },
    {
      method: 'PUT',
      path: '/blogs/view/:id',
      handler: 'custom.view',
    },
  ],
}
