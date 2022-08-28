import { Collection, Localize, StrapiResponse } from '@wsvvrijheid/types'

export const COLLECTION_MOCKS: Localize<StrapiResponse<Collection[]>> = {
  tr: {
    data: [
      {
        id: 5,
        createdAt: '2022-06-17T09:20:29.328Z',
        updatedAt: '2022-06-17T09:22:27.434Z',
        publishedAt: '2022-06-17T09:20:36.532Z',
        locale: 'tr',
        title: 'Korona Döneminde Yalnızlık',
        slug: 'korona-doneminde-yalnizlik',
        description: 'Açıklama',
        status: null,
        image: null,
        arts: [
          {
            id: 2,
            title: 'Anneler',
            slug: 'anneler',
            description: 'Anneler günü',
            content: 'Anneler günü konulu resim çalışması',
            createdAt: '2022-03-22T10:33:44.349Z',
            updatedAt: '2022-08-25T00:02:56.446Z',
            publishedAt: '2022-03-22T10:34:40.773Z',
            locale: 'tr',
            likes: 7,
            views: 5,
            status: null,
            isApproved: null,
            isRejected: null,
          },
          {
            id: 6,
            title: 'Korona döneminde yalnızlık',
            slug: 'korona',
            description: null,
            content:
              'Korona döneminde, bakım merkezinde kalan anneye ve ziyaretine izin verildiği sırada onunla zar zor iletişim kurabilen eşim. \nÜzücü, neler olup bittiğini hiç anlamayan annenin ve pencereye hafifçe vurarak onunla biraz sohbet etmeye çalışan eşimin boş bakışları, ama boşuna... her iki taraf için de dokunmak çok zord ve yorucuydu. ',
            createdAt: '2022-03-25T19:23:47.237Z',
            updatedAt: '2022-07-18T11:37:56.041Z',
            publishedAt: '2022-03-25T19:23:50.818Z',
            locale: 'tr',
            likes: 20,
            views: 3,
            status: null,
            isApproved: null,
            isRejected: null,
          },
          {
            id: 8,
            title: 'Yalnızlık',
            slug: 'yalnizlik',
            description: null,
            content:
              'Karısı ölen bir koca yalnız, annesi ölen bir çocuk yalnız, sevdiklerimiz gidiyor kalıyoruz yalnız. ',
            createdAt: '2022-03-25T19:28:03.911Z',
            updatedAt: '2022-08-24T08:52:01.670Z',
            publishedAt: '2022-03-25T19:28:05.724Z',
            locale: 'tr',
            likes: 21,
            views: 15,
            status: null,
            isApproved: null,
            isRejected: null,
          },
        ],
        localizations: [
          {
            id: 3,
            createdAt: '2022-06-17T09:19:06.765Z',
            updatedAt: '2022-06-17T09:21:42.134Z',
            publishedAt: '2022-06-17T09:19:15.023Z',
            locale: 'en',
            title: 'Loneliness in the Corona Period',
            slug: 'loneliness-in-the-corona-period',
            description: 'Description',
            status: null,
          },
          {
            id: 4,
            createdAt: '2022-06-17T09:19:43.529Z',
            updatedAt: '2022-06-17T09:22:04.528Z',
            publishedAt: '2022-06-17T09:19:50.356Z',
            locale: 'nl',
            title: 'Eenzaamheid in de Corona-period',
            slug: 'eenzaamheid-in-de-corona-period',
            description: 'Uitleg',
            status: null,
          },
        ],
      },
    ],
    meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
  },
  nl: {
    data: [
      {
        id: 4,
        createdAt: '2022-06-17T09:19:43.529Z',
        updatedAt: '2022-06-17T09:22:04.528Z',
        publishedAt: '2022-06-17T09:19:50.356Z',
        locale: 'nl',
        title: 'Eenzaamheid in de Corona-period',
        slug: 'eenzaamheid-in-de-corona-period',
        description: 'Uitleg',
        status: null,
        image: null,
        arts: [
          {
            id: 3,
            title: 'Moeder',
            slug: 'moeder',
            description: 'Moederdag',
            content: 'Schilderwerk op moederdag',
            createdAt: '2022-03-22T10:34:26.664Z',
            updatedAt: '2022-08-06T20:37:28.905Z',
            publishedAt: '2022-03-22T10:34:31.537Z',
            locale: 'nl',
            likes: 4,
            views: 5,
            status: null,
            isApproved: null,
            isRejected: null,
          },
          {
            id: 5,
            title: 'Eenzaamheid tijdens corona',
            slug: 'eenzaa',
            description: null,
            content:
              "Mijn vrouw die tijdens de lockdown een bliksembezoek mag brengen aan moeder, die in het zorgcentrum verblijft en ternauwernood contact kan krijgen met haar. Hartverscheurend is de lege blik van moeder die het helemaal niet begrijpt wat er gaande is en mijn vrouw die via zacht tikken op het raam toch enigszins probeert om nog even 'n praatje te kunnen maken met haar, maar tevergeefs ... het contact liep heel stroef en was voor beide partijen uitputten.",
            createdAt: '2022-03-25T19:21:11.815Z',
            updatedAt: '2022-06-12T16:15:21.405Z',
            publishedAt: '2022-03-25T19:22:15.419Z',
            locale: 'nl',
            likes: null,
            views: 1,
            status: null,
            isApproved: null,
            isRejected: null,
          },
          {
            id: 9,
            title: 'eenzaamheid',
            slug: 'alone',
            description: null,
            content:
              'Alleen is een man wiens vrouw stierf, aleeen is een kind wiens moeder stierf, onze dierbaren gaan weg, we blijven alleen ',
            createdAt: '2022-03-25T19:29:31.617Z',
            updatedAt: '2022-08-06T10:56:07.825Z',
            publishedAt: '2022-03-25T19:29:35.091Z',
            locale: 'nl',
            likes: 1,
            views: 1,
            status: null,
            isApproved: null,
            isRejected: null,
          },
        ],
        localizations: [
          {
            id: 3,
            createdAt: '2022-06-17T09:19:06.765Z',
            updatedAt: '2022-06-17T09:21:42.134Z',
            publishedAt: '2022-06-17T09:19:15.023Z',
            locale: 'en',
            title: 'Loneliness in the Corona Period',
            slug: 'loneliness-in-the-corona-period',
            description: 'Description',
            status: null,
          },
          {
            id: 5,
            createdAt: '2022-06-17T09:20:29.328Z',
            updatedAt: '2022-06-17T09:22:27.434Z',
            publishedAt: '2022-06-17T09:20:36.532Z',
            locale: 'tr',
            title: 'Korona Döneminde Yalnızlık',
            slug: 'korona-doneminde-yalnizlik',
            description: 'Açıklama',
            status: null,
          },
        ],
      },
    ],
    meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
  },
  en: {
    data: [
      {
        id: 3,
        createdAt: '2022-06-17T09:19:06.765Z',
        updatedAt: '2022-06-17T09:21:42.134Z',
        publishedAt: '2022-06-17T09:19:15.023Z',
        locale: 'en',
        title: 'Loneliness in the Corona Period',
        slug: 'loneliness-in-the-corona-period',
        description: 'Description',
        status: null,
        image: null,
        arts: [
          {
            id: 1,
            title: 'Mother',
            slug: 'mother',
            description: "Mother's day",
            content: "Painting work on mother's day",
            createdAt: '2022-03-22T10:33:06.622Z',
            updatedAt: '2022-08-27T06:27:31.981Z',
            publishedAt: '2022-03-22T10:34:34.541Z',
            locale: 'en',
            likes: 6,
            views: 6,
            status: null,
            isApproved: null,
            isRejected: null,
          },
          {
            id: 52,
            title: 'Samenvvv',
            slug: 'samenvvv',
            description: 'Samen voor Vrijheid en Verbinding',
            content: 'Samen inhoud',
            createdAt: '2022-05-28T18:23:37.518Z',
            updatedAt: '2022-08-24T03:56:11.979Z',
            publishedAt: '2022-05-28T18:23:37.431Z',
            locale: 'en',
            likes: 2,
            views: null,
            status: null,
            isApproved: null,
            isRejected: null,
          },
        ],
        localizations: [
          {
            id: 4,
            createdAt: '2022-06-17T09:19:43.529Z',
            updatedAt: '2022-06-17T09:22:04.528Z',
            publishedAt: '2022-06-17T09:19:50.356Z',
            locale: 'nl',
            title: 'Eenzaamheid in de Corona-period',
            slug: 'eenzaamheid-in-de-corona-period',
            description: 'Uitleg',
            status: null,
          },
          {
            id: 5,
            createdAt: '2022-06-17T09:20:29.328Z',
            updatedAt: '2022-06-17T09:22:27.434Z',
            publishedAt: '2022-06-17T09:20:36.532Z',
            locale: 'tr',
            title: 'Korona Döneminde Yalnızlık',
            slug: 'korona-doneminde-yalnizlik',
            description: 'Açıklama',
            status: null,
          },
        ],
      },
    ],
    meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
  },
}
