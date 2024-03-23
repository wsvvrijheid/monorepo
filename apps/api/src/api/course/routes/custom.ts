export default {
  routes: [
    {
      method: 'GET',
      path: '/course-mailchimp/:id',
      handler: 'custom.createMailList',
    },
  ],
}
