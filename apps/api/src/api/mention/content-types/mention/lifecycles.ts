import { TwitterApi } from 'twitter-api-v2';
import { Lifecycles } from '@strapi/strapi';

export default {
  afterCreate({ result }) {
    const twitterApi = strapi.plugin('twitter').config('client') as TwitterApi;

    twitterApi.v1
      .user({ screen_name: result.username as unknown as string })
      .then((data) => {
        strapi
          .service('api::mention.mention')
          .update(result.id, { data: { data } });
      });
  },
};
