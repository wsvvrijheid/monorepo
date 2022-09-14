import { Comment, StrapiResponse } from '@wsvvrijheid/types'

export const COMMENT_MOCKS: StrapiResponse<Comment[]> = {
  data: [
    {
      id: 1,
      createdAt: '2022-06-15T20:10:32.194Z',
      updatedAt: '2022-06-15T20:10:32.194Z',
      publishedAt: '2022-06-15T20:10:32.176Z',
      name: 'Asd',
      email: 'ss@ss.com',
      content: 'asd',
      blocked: null,
      user: null,
      blog: null,
      art: null,
    },
    {
      id: 2,
      createdAt: '2022-06-16T03:08:21.307Z',
      updatedAt: '2022-06-16T03:08:21.307Z',
      publishedAt: '2022-06-16T03:08:21.290Z',
      name: 'Yasin Kilic',
      email: 'yasin@samenvvv.nl',
      content: 'Harika',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 76,
        title: 'Hobi ',
        slug: 'hobi',
        description: 'Bu sene çilek fidesi alarak yetiştirdim.',
        content: 'Çilek',
        createdAt: '2022-06-14T15:41:41.478Z',
        updatedAt: '2022-09-13T21:16:24.996Z',
        publishedAt: '2022-06-14T15:41:41.465Z',
        locale: 'tr',
        likes: 9,
        views: 9,
        translationStatus: 'original',
        approvalStatus: 'pending',
      },
    },
    {
      id: 3,
      createdAt: '2022-06-16T03:13:28.214Z',
      updatedAt: '2022-06-16T03:13:28.214Z',
      publishedAt: '2022-06-16T03:13:28.208Z',
      name: 'Mehtap',
      email: 'mehtap@samenvvv.nl',
      content: 'Cok guzel',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 76,
        title: 'Hobi ',
        slug: 'hobi',
        description: 'Bu sene çilek fidesi alarak yetiştirdim.',
        content: 'Çilek',
        createdAt: '2022-06-14T15:41:41.478Z',
        updatedAt: '2022-09-13T21:16:24.996Z',
        publishedAt: '2022-06-14T15:41:41.465Z',
        locale: 'tr',
        likes: 9,
        views: 9,
        translationStatus: 'original',
        approvalStatus: 'pending',
      },
    },
    {
      id: 4,
      createdAt: '2022-06-16T03:14:40.473Z',
      updatedAt: '2022-06-16T03:14:40.473Z',
      publishedAt: '2022-06-16T03:14:40.465Z',
      name: null,
      email: null,
      content: 'Tesekkurler',
      blocked: null,
      user: {
        id: 3,
        username: 'test',
        email: 'test@samenvvv.nl',
        provider: 'local',
        confirmed: true,
        blocked: false,
        createdAt: '2022-03-21T16:29:36.680Z',
        updatedAt: '2022-09-14T02:42:42.037Z',
        name: null,
      },
      blog: null,
      art: {
        id: 76,
        title: 'Hobi ',
        slug: 'hobi',
        description: 'Bu sene çilek fidesi alarak yetiştirdim.',
        content: 'Çilek',
        createdAt: '2022-06-14T15:41:41.478Z',
        updatedAt: '2022-09-13T21:16:24.996Z',
        publishedAt: '2022-06-14T15:41:41.465Z',
        locale: 'tr',
        likes: 9,
        views: 9,
        translationStatus: 'original',
        approvalStatus: 'pending',
      },
    },
    {
      id: 5,
      createdAt: '2022-06-16T03:21:14.105Z',
      updatedAt: '2022-06-16T03:21:14.105Z',
      publishedAt: '2022-06-16T03:21:14.097Z',
      name: null,
      email: null,
      content: 'Mooie!',
      blocked: null,
      user: {
        id: 3,
        username: 'test',
        email: 'test@samenvvv.nl',
        provider: 'local',
        confirmed: true,
        blocked: false,
        createdAt: '2022-03-21T16:29:36.680Z',
        updatedAt: '2022-09-14T02:42:42.037Z',
        name: null,
      },
      blog: null,
      art: {
        id: 76,
        title: 'Hobi ',
        slug: 'hobi',
        description: 'Bu sene çilek fidesi alarak yetiştirdim.',
        content: 'Çilek',
        createdAt: '2022-06-14T15:41:41.478Z',
        updatedAt: '2022-09-13T21:16:24.996Z',
        publishedAt: '2022-06-14T15:41:41.465Z',
        locale: 'tr',
        likes: 9,
        views: 9,
        translationStatus: 'original',
        approvalStatus: 'pending',
      },
    },
    {
      id: 6,
      createdAt: '2022-06-16T03:27:31.363Z',
      updatedAt: '2022-06-16T03:27:31.363Z',
      publishedAt: '2022-06-16T03:27:31.360Z',
      name: 'Mustafa ',
      email: 'cana66331@gmail.com',
      content: 'cok guzel',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 78,
        title: 'Anneler günü ',
        slug: 'anneler-gn',
        description: 'Anneler günü resmi ',
        content: 'Anneler günü yarışması resmi ',
        createdAt: '2022-06-14T16:50:25.765Z',
        updatedAt: '2022-09-13T21:15:52.737Z',
        publishedAt: '2022-06-14T16:50:25.749Z',
        locale: 'tr',
        likes: 6,
        views: 16,
        translationStatus: 'original',
        approvalStatus: 'approved',
      },
    },
    {
      id: 7,
      createdAt: '2022-06-16T03:28:20.349Z',
      updatedAt: '2022-06-16T03:28:20.349Z',
      publishedAt: '2022-06-16T03:28:20.347Z',
      name: null,
      email: null,
      content: 'super',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 78,
        title: 'Anneler günü ',
        slug: 'anneler-gn',
        description: 'Anneler günü resmi ',
        content: 'Anneler günü yarışması resmi ',
        createdAt: '2022-06-14T16:50:25.765Z',
        updatedAt: '2022-09-13T21:15:52.737Z',
        publishedAt: '2022-06-14T16:50:25.749Z',
        locale: 'tr',
        likes: 6,
        views: 16,
        translationStatus: 'original',
        approvalStatus: 'approved',
      },
    },
    {
      id: 8,
      createdAt: '2022-06-16T03:28:29.689Z',
      updatedAt: '2022-06-16T03:28:29.689Z',
      publishedAt: '2022-06-16T03:28:29.687Z',
      name: null,
      email: null,
      content: 'daha iyi',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 78,
        title: 'Anneler günü ',
        slug: 'anneler-gn',
        description: 'Anneler günü resmi ',
        content: 'Anneler günü yarışması resmi ',
        createdAt: '2022-06-14T16:50:25.765Z',
        updatedAt: '2022-09-13T21:15:52.737Z',
        publishedAt: '2022-06-14T16:50:25.749Z',
        locale: 'tr',
        likes: 6,
        views: 16,
        translationStatus: 'original',
        approvalStatus: 'approved',
      },
    },
    {
      id: 9,
      createdAt: '2022-06-16T03:28:36.241Z',
      updatedAt: '2022-06-16T03:28:36.241Z',
      publishedAt: '2022-06-16T03:28:36.240Z',
      name: null,
      email: null,
      content: 'iyi',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 78,
        title: 'Anneler günü ',
        slug: 'anneler-gn',
        description: 'Anneler günü resmi ',
        content: 'Anneler günü yarışması resmi ',
        createdAt: '2022-06-14T16:50:25.765Z',
        updatedAt: '2022-09-13T21:15:52.737Z',
        publishedAt: '2022-06-14T16:50:25.749Z',
        locale: 'tr',
        likes: 6,
        views: 16,
        translationStatus: 'original',
        approvalStatus: 'approved',
      },
    },
    {
      id: 10,
      createdAt: '2022-06-16T03:28:44.178Z',
      updatedAt: '2022-06-16T03:28:44.178Z',
      publishedAt: '2022-06-16T03:28:44.177Z',
      name: null,
      email: null,
      content: 'mukemmel',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 78,
        title: 'Anneler günü ',
        slug: 'anneler-gn',
        description: 'Anneler günü resmi ',
        content: 'Anneler günü yarışması resmi ',
        createdAt: '2022-06-14T16:50:25.765Z',
        updatedAt: '2022-09-13T21:15:52.737Z',
        publishedAt: '2022-06-14T16:50:25.749Z',
        locale: 'tr',
        likes: 6,
        views: 16,
        translationStatus: 'original',
        approvalStatus: 'approved',
      },
    },
    {
      id: 11,
      createdAt: '2022-06-16T03:29:48.829Z',
      updatedAt: '2022-06-16T03:29:48.829Z',
      publishedAt: '2022-06-16T03:29:48.826Z',
      name: null,
      email: null,
      content: 'goed',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 2,
        title: 'Anneler',
        slug: 'anneler',
        description: 'Anneler günü',
        content: 'Anneler günü konulu resim çalışması',
        createdAt: '2022-03-22T10:33:44.349Z',
        updatedAt: '2022-09-13T21:56:59.220Z',
        publishedAt: '2022-03-22T10:34:40.773Z',
        locale: 'tr',
        likes: 7,
        views: 6,
        translationStatus: 'original',
        approvalStatus: 'approved',
      },
    },
    {
      id: 12,
      createdAt: '2022-06-16T03:30:22.429Z',
      updatedAt: '2022-06-16T03:30:22.429Z',
      publishedAt: '2022-06-16T03:30:22.427Z',
      name: null,
      email: null,
      content: 'goed gedaan',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 3,
        title: 'Moeder',
        slug: 'moeder',
        description: 'Moederdag',
        content: 'Schilderwerk op moederdag',
        createdAt: '2022-03-22T10:34:26.664Z',
        updatedAt: '2022-09-13T21:56:59.174Z',
        publishedAt: '2022-03-22T10:34:31.537Z',
        locale: 'nl',
        likes: 7,
        views: 6,
        translationStatus: 'approved',
        approvalStatus: 'approved',
      },
    },
    {
      id: 13,
      createdAt: '2022-06-16T03:30:34.966Z',
      updatedAt: '2022-06-16T03:30:34.966Z',
      publishedAt: '2022-06-16T03:30:34.964Z',
      name: null,
      email: null,
      content: 'betwr',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 3,
        title: 'Moeder',
        slug: 'moeder',
        description: 'Moederdag',
        content: 'Schilderwerk op moederdag',
        createdAt: '2022-03-22T10:34:26.664Z',
        updatedAt: '2022-09-13T21:56:59.174Z',
        publishedAt: '2022-03-22T10:34:31.537Z',
        locale: 'nl',
        likes: 7,
        views: 6,
        translationStatus: 'approved',
        approvalStatus: 'approved',
      },
    },
    {
      id: 14,
      createdAt: '2022-06-16T03:30:58.047Z',
      updatedAt: '2022-06-16T03:30:58.047Z',
      publishedAt: '2022-06-16T03:30:58.046Z',
      name: null,
      email: null,
      content: 'peefect',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 1,
        title: 'Mother',
        slug: 'mother',
        description: "Mother's day",
        content: "Painting work on mother's day",
        createdAt: '2022-03-22T10:33:06.622Z',
        updatedAt: '2022-09-13T21:56:59.218Z',
        publishedAt: '2022-03-22T10:34:34.541Z',
        locale: 'en',
        likes: 7,
        views: 6,
        translationStatus: 'approved',
        approvalStatus: 'approved',
      },
    },
    {
      id: 15,
      createdAt: '2022-06-16T03:32:34.267Z',
      updatedAt: '2022-06-16T03:32:34.267Z',
      publishedAt: '2022-06-16T03:32:34.265Z',
      name: null,
      email: null,
      content: 'son yorum',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 78,
        title: 'Anneler günü ',
        slug: 'anneler-gn',
        description: 'Anneler günü resmi ',
        content: 'Anneler günü yarışması resmi ',
        createdAt: '2022-06-14T16:50:25.765Z',
        updatedAt: '2022-09-13T21:15:52.737Z',
        publishedAt: '2022-06-14T16:50:25.749Z',
        locale: 'tr',
        likes: 6,
        views: 16,
        translationStatus: 'original',
        approvalStatus: 'approved',
      },
    },
    {
      id: 16,
      createdAt: '2022-06-22T13:14:14.886Z',
      updatedAt: '2022-06-22T13:14:14.886Z',
      publishedAt: '2022-06-22T13:14:14.883Z',
      name: 'Ahmet',
      email: 'ahmet@f.c',
      content: 'Rengarenk 🌷',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 62,
        title: 'Laleler',
        slug: 'laleler',
        description: 'Lale bahcesi',
        content: 'Lale bahceleri icerik',
        createdAt: '2022-06-12T04:20:55.578Z',
        updatedAt: '2022-09-13T21:20:49.814Z',
        publishedAt: '2022-06-12T04:20:55.562Z',
        locale: 'tr',
        likes: 3,
        views: 5,
        translationStatus: 'original',
        approvalStatus: 'approved',
      },
    },
    {
      id: 17,
      createdAt: '2022-06-22T13:14:19.339Z',
      updatedAt: '2022-06-22T13:14:19.339Z',
      publishedAt: '2022-06-22T13:14:19.337Z',
      name: 'Ahmet',
      email: 'ahmet@f.c',
      content: 'Rengarenk 🌷',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 62,
        title: 'Laleler',
        slug: 'laleler',
        description: 'Lale bahcesi',
        content: 'Lale bahceleri icerik',
        createdAt: '2022-06-12T04:20:55.578Z',
        updatedAt: '2022-09-13T21:20:49.814Z',
        publishedAt: '2022-06-12T04:20:55.562Z',
        locale: 'tr',
        likes: 3,
        views: 5,
        translationStatus: 'original',
        approvalStatus: 'approved',
      },
    },
    {
      id: 18,
      createdAt: '2022-06-22T13:15:22.165Z',
      updatedAt: '2022-06-22T13:15:22.165Z',
      publishedAt: '2022-06-22T13:15:22.163Z',
      name: 'Hakan',
      email: 'h@h.com',
      content: 'Guzel',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 13,
        title: 'Snow',
        slug: 'snow-alt',
        description: 'Snow in Netherland',
        content: 'Snow in Netherland',
        createdAt: '2022-04-01T08:07:24.897Z',
        updatedAt: '2022-09-13T20:15:59.049Z',
        publishedAt: '2022-04-01T08:07:27.811Z',
        locale: 'en',
        likes: 11,
        views: 9,
        translationStatus: 'approved',
        approvalStatus: 'approved',
      },
    },
    {
      id: 19,
      createdAt: '2022-06-22T14:08:57.252Z',
      updatedAt: '2022-06-22T14:08:57.252Z',
      publishedAt: '2022-06-22T14:08:57.251Z',
      name: 'Beyza',
      email: 'beyza@b.c',
      content: 'Cok hos!',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 75,
        title: 'Günbatımı',
        slug: 'gnbatm',
        description: 'Günbatımı',
        content: 'Günbatımıyla renklerin eşsiz uyumu',
        createdAt: '2022-06-14T15:29:51.383Z',
        updatedAt: '2022-09-13T21:16:34.562Z',
        publishedAt: '2022-06-14T15:29:51.372Z',
        locale: 'tr',
        likes: 1,
        views: 5,
        translationStatus: 'original',
        approvalStatus: 'rejected',
      },
    },
    {
      id: 20,
      createdAt: '2022-06-22T15:27:04.643Z',
      updatedAt: '2022-06-22T15:27:04.643Z',
      publishedAt: '2022-06-22T15:27:04.640Z',
      name: 'Ahmet',
      email: 'a@a.a',
      content: 'Muhtesem',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 75,
        title: 'Günbatımı',
        slug: 'gnbatm',
        description: 'Günbatımı',
        content: 'Günbatımıyla renklerin eşsiz uyumu',
        createdAt: '2022-06-14T15:29:51.383Z',
        updatedAt: '2022-09-13T21:16:34.562Z',
        publishedAt: '2022-06-14T15:29:51.372Z',
        locale: 'tr',
        likes: 1,
        views: 5,
        translationStatus: 'original',
        approvalStatus: 'rejected',
      },
    },
    {
      id: 21,
      createdAt: '2022-06-22T15:30:42.383Z',
      updatedAt: '2022-06-22T15:30:42.383Z',
      publishedAt: '2022-06-22T15:30:42.380Z',
      name: 'Ahmet',
      email: 'a@a.a',
      content: 'Muhtesem',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 75,
        title: 'Günbatımı',
        slug: 'gnbatm',
        description: 'Günbatımı',
        content: 'Günbatımıyla renklerin eşsiz uyumu',
        createdAt: '2022-06-14T15:29:51.383Z',
        updatedAt: '2022-09-13T21:16:34.562Z',
        publishedAt: '2022-06-14T15:29:51.372Z',
        locale: 'tr',
        likes: 1,
        views: 5,
        translationStatus: 'original',
        approvalStatus: 'rejected',
      },
    },
    {
      id: 22,
      createdAt: '2022-06-22T18:53:38.116Z',
      updatedAt: '2022-06-22T18:53:38.116Z',
      publishedAt: '2022-06-22T18:53:38.113Z',
      name: 'Bekir',
      email: 'b@b.com',
      content: 'Eskiden ne kar yagardi...',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 13,
        title: 'Snow',
        slug: 'snow-alt',
        description: 'Snow in Netherland',
        content: 'Snow in Netherland',
        createdAt: '2022-04-01T08:07:24.897Z',
        updatedAt: '2022-09-13T20:15:59.049Z',
        publishedAt: '2022-04-01T08:07:27.811Z',
        locale: 'en',
        likes: 11,
        views: 9,
        translationStatus: 'approved',
        approvalStatus: 'approved',
      },
    },
    {
      id: 23,
      createdAt: '2022-08-24T19:48:05.321Z',
      updatedAt: '2022-08-24T19:48:05.321Z',
      publishedAt: '2022-08-24T19:48:05.319Z',
      name: null,
      email: null,
      content: 'Merhaba',
      blocked: null,
      user: {
        id: 51,
        username: 'Cengiz Murat',
        email: 'sincanl1f1.2@gmail.com',
        provider: 'local',
        confirmed: true,
        blocked: false,
        createdAt: '2022-06-14T16:47:41.568Z',
        updatedAt: '2022-09-14T02:36:21.111Z',
        name: null,
      },
      blog: null,
      art: {
        id: 1,
        title: 'Mother',
        slug: 'mother',
        description: "Mother's day",
        content: "Painting work on mother's day",
        createdAt: '2022-03-22T10:33:06.622Z',
        updatedAt: '2022-09-13T21:56:59.218Z',
        publishedAt: '2022-03-22T10:34:34.541Z',
        locale: 'en',
        likes: 7,
        views: 6,
        translationStatus: 'approved',
        approvalStatus: 'approved',
      },
    },
    {
      id: 24,
      createdAt: '2022-08-24T20:03:56.576Z',
      updatedAt: '2022-08-24T20:03:56.576Z',
      publishedAt: '2022-08-24T20:03:56.574Z',
      name: null,
      email: null,
      content: 'Merhaba',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 4,
        title: 'Fire',
        slug: 'fire',
        description: 'There is a fire in the forest',
        content: 'Fire Content',
        createdAt: '2022-03-25T15:50:26.535Z',
        updatedAt: '2022-09-13T21:19:38.830Z',
        publishedAt: '2022-03-25T15:50:28.939Z',
        locale: 'en',
        likes: 6,
        views: 4,
        translationStatus: 'pending',
        approvalStatus: 'approved',
      },
    },
    {
      id: 25,
      createdAt: '2022-08-24T20:07:50.663Z',
      updatedAt: '2022-08-24T20:07:50.663Z',
      publishedAt: '2022-08-24T20:07:50.661Z',
      name: null,
      email: null,
      content: 'Cool',
      blocked: null,
      user: null,
      blog: null,
      art: {
        id: 52,
        title: 'Samenvvv',
        slug: 'samenvvv',
        description: 'Samen voor Vrijheid en Verbinding',
        content: 'Samen inhoud',
        createdAt: '2022-05-28T18:23:37.518Z',
        updatedAt: '2022-09-13T20:17:50.988Z',
        publishedAt: '2022-05-28T18:23:37.431Z',
        locale: 'en',
        likes: 5,
        views: 0,
        translationStatus: 'approved',
        approvalStatus: 'approved',
      },
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 2, total: 39 } },
}
