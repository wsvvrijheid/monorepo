export default {
  routes: [
    {
      // Path defined with an URL parameter
      method: 'GET',
      path: '/mentions/search',
      handler: 'custom.search',
    },
  ],
}
