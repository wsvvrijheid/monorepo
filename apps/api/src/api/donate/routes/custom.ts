export default {
  routes: [
    {
      method: 'POST',
      path: '/donates/email/:id',
      handler: 'custom.email',
    },
  ],
}
