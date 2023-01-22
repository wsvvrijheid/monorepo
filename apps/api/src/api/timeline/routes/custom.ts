export default {
  routes: [
    {
      method: 'POST',
      path: '/timelines/:id/update-tweets',
      handler: 'custom.updateTweets',
    },
  ],
}
