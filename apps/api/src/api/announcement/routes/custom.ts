export default {
  routes: [
    {
      method: 'PUT',
      path: '/announcements/approve/:id',
      handler: 'custom.approve',
    },
  ],
}
