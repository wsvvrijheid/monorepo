import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::timeline.timeline',
  ({ strapi }) => ({
    async updateTweets(ctx) {
      const { id } = ctx.params;

      const tweetsResponse = await strapi
        .plugin('twitter')
        .config('client')
        .v2.userTimeline(id, {
          expansions: ['attachments.media_keys'],
          'tweet.fields': ['created_at'],
          'media.fields': ['preview_image_url', 'url'],
        });

      const tweetsData = tweetsResponse?._realData.data;
      const includes = tweetsResponse?._realData.includes;

      const tweets = tweetsData?.map(
        ({ id, text, created_at, attachments }) => {
          let media = includes?.media?.find(
            (media) => media.media_key === attachments?.media_keys?.[0]
          );

          return {
            id,
            text,
            created_at,
            media,
          };
        }
      );

      return tweets;
    },
  })
);
