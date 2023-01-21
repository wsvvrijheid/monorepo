export default {
  routes: [
    {
      // Path defined with an URL parameter
      method: 'GET',
      path: '/hashtags/search',
      handler: 'custom.search',
    },
  ],
}
