import { Mention, StrapiResponse } from '@wsvvrijheid/types'

export const MENTION_MOCKS: StrapiResponse<Mention[]> = {
  data: [
    {
      id: 1,
      username: 'infolotusmedia',
      data: {
        id: 1461825697224315000,
        url: 'https://t.co/UcPKazg7tW',
        lang: null,
        name: 'Together for Freedom and Connection',
        id_str: '1461825697224314882',
        status: {
          id: 1504173527808757800,
          geo: null,
          lang: 'en',
          place: null,
          id_str: '1504173527808757765',
          source:
            '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
          entities: {
            urls: [
              {
                url: 'https://t.co/qFitZj89si',
                indices: [227, 250],
                display_url: 'news.bbc.co.uk/onthisday/hi/d…',
                expanded_url:
                  'http://news.bbc.co.uk/onthisday/hi/dates/stories/march/16/newsid_4304000/4304853.stm',
              },
            ],
            symbols: [],
            hashtags: [
              {
                text: 'Halabja',
                indices: [25, 33],
              },
              {
                text: 'Iraq',
                indices: [175, 180],
              },
              {
                text: 'willemengel',
                indices: [183, 195],
              },
            ],
            user_mentions: [],
          },
          favorited: false,
          full_text:
            '⏲️1988: Thousands die in #Halabja gas attack\nThousands of people are reported to have been killed and many others injured in a poison gas attack on a Kurdish city in northern #Iraq.\n\n#willemengel \nYaşamHakkıİçin İnfazıErtele  \nhttps://t.co/qFitZj89si',
          retweeted: false,
          truncated: false,
          created_at: 'Wed Mar 16 19:11:29 +0000 2022',
          coordinates: null,
          contributors: null,
          retweet_count: 32,
          favorite_count: 26,
          is_quote_status: false,
          display_text_range: [0, 250],
          possibly_sensitive: false,
          in_reply_to_user_id: null,
          in_reply_to_status_id: null,
          in_reply_to_screen_name: null,
          in_reply_to_user_id_str: null,
          in_reply_to_status_id_str: null,
        },
        entities: {
          url: {
            urls: [
              {
                url: 'https://t.co/UcPKazg7tW',
                indices: [0, 23],
                display_url: 'samenvvv.nl',
                expanded_url: 'http://www.samenvvv.nl',
              },
            ],
          },
          description: {
            urls: [],
          },
        },
        location: 'The Netherlands',
        verified: false,
        following: null,
        protected: false,
        time_zone: null,
        created_at: 'Fri Nov 19 22:36:43 +0000 2021',
        utc_offset: null,
        description:
          'Our platform was established to announce human rights violations to the public and to share agendas to contribute to society Dutch:@samenvvv Turkish:@samenvvvTR',
        geo_enabled: false,
        screen_name: 'samenvvvEN',
        listed_count: 1,
        friends_count: 8,
        is_translator: false,
        notifications: null,
        statuses_count: 165,
        default_profile: true,
        followers_count: 318,
        translator_type: 'none',
        favourites_count: 157,
        profile_location: null,
        profile_image_url:
          'http://pbs.twimg.com/profile_images/1461826829346615306/5EDPjrbd_normal.jpg',
        profile_banner_url:
          'https://pbs.twimg.com/profile_banners/1461825697224314882/1637361651',
        profile_link_color: '1DA1F2',
        profile_text_color: '333333',
        follow_request_sent: null,
        contributors_enabled: false,
        has_extended_profile: true,
        default_profile_image: false,
        withheld_in_countries: [],
        is_translation_enabled: false,
        profile_background_tile: false,
        profile_image_url_https:
          'https://pbs.twimg.com/profile_images/1461826829346615306/5EDPjrbd_normal.jpg',
        profile_background_color: 'F5F8FA',
        profile_sidebar_fill_color: 'DDEEF6',
        profile_background_image_url: null,
        profile_sidebar_border_color: 'C0DEED',
        profile_use_background_image: true,
        profile_background_image_url_https: null,
      },
      createdAt: '2022-03-22T15:20:22.002Z',
      updatedAt: '2022-03-22T15:20:33.750Z',
      publishedAt: '2022-03-22T15:20:25.243Z',
      locale: 'nl',
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
}
