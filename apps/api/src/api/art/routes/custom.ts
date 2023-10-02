export default {
  routes: [
    {
      method: 'PUT',
      path: '/arts/approve/:id',
      handler: 'custom.approve',
    },
    {
      method: 'PUT',
      path: '/arts/:id/like',
      handler: 'custom.like',
    },
    {
      method: 'PUT',
      path: '/arts/:id/unlike',
      handler: 'custom.unlike',
    },
    {
      method: 'PUT',
      path: '/arts/:id/view',
      handler: 'custom.view',
    },
  ],
}
