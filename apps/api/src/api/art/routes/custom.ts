export default {
  routes: [
    {
      method: 'PUT',
      path: '/arts/approve/:id',
      handler: 'custom.approve',
    },
    {
      method: 'PUT',
      path: '/arts/like/:id',
      handler: 'custom.like',
    },
    {
      method: 'PUT',
      path: '/arts/view/:id',
      handler: 'custom.view',
    },
  ],
}
