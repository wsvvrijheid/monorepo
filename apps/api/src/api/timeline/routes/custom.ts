export default {
  routes: [
    {
      method: 'POST',
      path: '/timelines/:id/update-tweets',
      handler: 'timeline.updateTweets',
    },
  ],
};
