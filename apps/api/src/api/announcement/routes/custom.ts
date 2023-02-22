export default {
  routes: [
    {
      method: 'PUT',
      path: '/announcements/approve/:id',
      handler: 'custom.approve',
    },
    {
      method: 'PUT',
      path: '/announcements/relation/:id',
      handler: 'custom.relation',
    },
  ],
}
