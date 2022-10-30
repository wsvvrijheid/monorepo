export default {
  routes: [
    {
      // Path defined with an URL parameter
      method: 'POST',
      path: '/topic/sync',
      handler: 'custom.sync',
    },
  ],
}
