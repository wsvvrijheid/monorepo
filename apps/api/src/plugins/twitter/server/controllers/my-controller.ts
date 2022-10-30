import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  users(ctx) {
    const result = strapi
      .plugin('twitter')
      .service('myService')
      .users(ctx.query.q);

    return result;
  },
  searchUsers(ctx) {
    const result = strapi
      .plugin('twitter')
      .service('myService')
      .searchUsers(ctx.query.q);

    return result;
  },
});
