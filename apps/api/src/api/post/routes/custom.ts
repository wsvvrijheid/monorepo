export default {
  routes: [
    {
      method: 'PUT',
      path: '/posts/approve/:id',
      handler: 'custom.approve',
    },
  ],
}
