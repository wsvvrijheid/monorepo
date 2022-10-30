import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async users(users) {
    return strapi
      .plugin('twitter')
      .config('client')
      .v1.users({ screen_name: users });
  },
  async searchUsers(query) {
    return strapi.plugin('twitter').config('client').v1.searchUsers(query);
  },
});
