export default [
  {
    method: 'GET',
    path: '/v1/users',
    handler: 'myController.users',
  },
  {
    method: 'GET',
    path: '/v1/search-users',
    handler: 'myController.searchUsers',
  },
];
