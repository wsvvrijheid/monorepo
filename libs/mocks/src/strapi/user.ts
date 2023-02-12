import { User } from '@wsvvrijheid/types'

export const USER_MOCKS: Array<User> = [
  {
    id: 38,
    username: 'Artist',
    email: 'artist@samenvvv.nl',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2022-05-27T04:57:06.982Z',
    updatedAt: '2022-09-14T02:36:08.545Z',
    name: null,
    avatar: null,
    role: {
      id: 1,
      name: 'Authenticated',
      description: 'Default role given to authenticated user.',
      type: 'authenticated',
      createdAt: '2022-03-31T18:54:29.468Z',
      updatedAt: '2022-09-14T02:07:31.634Z',
    },
    volunteer: null,
    votes: [],
  },
  {
    id: 51,
    username: 'Cengiz Murat',
    email: 'sincanl1f1.2@gmail.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2022-06-14T16:47:41.568Z',
    updatedAt: '2022-09-14T02:36:21.111Z',
    name: null,
    avatar: {
      id: 108,
      name: 'istockphoto-1277804822-612x612.jpg',
      alternativeText: null,
      caption: null,
      width: 612,
      height: 408,
      formats: {
        small: {
          ext: '.jpg',
          url: '/uploads/small_istockphoto_1277804822_612x612_ac436eef65.jpg',
          hash: 'small_istockphoto_1277804822_612x612_ac436eef65',
          mime: 'image/jpeg',
          name: 'small_istockphoto-1277804822-612x612.jpg',
          path: null,
          size: 17.45,
          width: 500,
          height: 333,
        },
        thumbnail: {
          ext: '.jpg',
          url: '/uploads/thumbnail_istockphoto_1277804822_612x612_ac436eef65.jpg',
          hash: 'thumbnail_istockphoto_1277804822_612x612_ac436eef65',
          mime: 'image/jpeg',
          name: 'thumbnail_istockphoto-1277804822-612x612.jpg',
          path: null,
          size: 5.66,
          width: 234,
          height: 156,
        },
      },
      hash: 'istockphoto_1277804822_612x612_ac436eef65',
      ext: '.jpg',
      mime: 'image/jpeg',
      size: 21,
      url: '/uploads/istockphoto_1277804822_612x612_ac436eef65.jpg',
      previewUrl: null,
      provider: 'local',
      provider_metadata: null,
      createdAt: '2022-06-13T10:43:02.269Z',
      updatedAt: '2022-06-13T10:43:02.269Z',
    },
    role: {
      id: 7,
      name: 'Translator',
      description: 'Translator',
      type: 'translator',
      createdAt: '2022-09-14T02:01:43.814Z',
      updatedAt: '2022-09-14T02:01:43.814Z',
    },
    comments: [
      {
        id: 23,
        createdAt: '2022-08-24T19:48:05.321Z',
        updatedAt: '2022-08-24T19:48:05.321Z',
        publishedAt: '2022-08-24T19:48:05.319Z',
        name: null,
        email: null,
        content: 'Merhaba',
        blocked: null,
      },
    ],
    volunteer: null,
    votes: [],
  },
  {
    id: 31,
    username: 'Ekrem',
    email: 'zhrekrmsrtk@gmail.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2022-04-18T09:38:03.001Z',
    updatedAt: '2022-09-14T02:36:32.430Z',
    name: null,
    avatar: {
      id: 40,
      name: 'undraw_black_lives_matter_rndk.png',
      alternativeText: 'undraw_black_lives_matter_rndk.png',
      caption: 'undraw_black_lives_matter_rndk.png',
      width: 992,
      height: 983,
      formats: {
        small: {
          ext: '.png',
          url: '/uploads/small_undraw_black_lives_matter_rndk_009c68a199.png',
          hash: 'small_undraw_black_lives_matter_rndk_009c68a199',
          mime: 'image/png',
          name: 'small_undraw_black_lives_matter_rndk.png',
          path: null,
          size: 28.1,
          width: 500,
          height: 495,
        },
        medium: {
          ext: '.png',
          url: '/uploads/medium_undraw_black_lives_matter_rndk_009c68a199.png',
          hash: 'medium_undraw_black_lives_matter_rndk_009c68a199',
          mime: 'image/png',
          name: 'medium_undraw_black_lives_matter_rndk.png',
          path: null,
          size: 48.48,
          width: 750,
          height: 743,
        },
        thumbnail: {
          ext: '.png',
          url: '/uploads/thumbnail_undraw_black_lives_matter_rndk_009c68a199.png',
          hash: 'thumbnail_undraw_black_lives_matter_rndk_009c68a199',
          mime: 'image/png',
          name: 'thumbnail_undraw_black_lives_matter_rndk.png',
          path: null,
          size: 7.59,
          width: 158,
          height: 156,
        },
      },
      hash: 'undraw_black_lives_matter_rndk_009c68a199',
      ext: '.png',
      mime: 'image/png',
      size: 12.11,
      url: '/uploads/undraw_black_lives_matter_rndk_009c68a199.png',
      previewUrl: null,
      provider: 'local',
      provider_metadata: null,
      createdAt: '2022-05-16T16:50:26.385Z',
      updatedAt: '2022-05-16T16:50:26.385Z',
    },
    role: {
      id: 5,
      name: 'Author',
      description: 'Author',
      type: 'author',
      createdAt: '2022-09-14T01:21:31.074Z',
      updatedAt: '2022-09-14T01:57:14.305Z',
    },
    comments: [
      {
        id: 32,
        createdAt: '2022-08-27T06:27:39.715Z',
        updatedAt: '2022-08-27T06:27:39.715Z',
        publishedAt: '2022-08-27T06:27:39.714Z',
        name: null,
        email: null,
        content: 'Liked!',
        blocked: null,
      },
    ],
    volunteer: null,
    votes: [],
  },
  {
    id: 54,
    username: 'Gmz',
    email: 'qamzeislek@gmail.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2022-06-26T16:31:41.698Z',
    updatedAt: '2022-09-14T02:36:44.526Z',
    name: null,
    avatar: null,
    role: {
      id: 4,
      name: 'Editor',
      description: 'Editor',
      type: 'editor',
      createdAt: '2022-09-14T01:21:03.391Z',
      updatedAt: '2022-09-14T01:58:07.254Z',
    },
    volunteer: null,
    votes: [],
  },
  {
    id: 46,
    username: 'Mrv',
    email: 'mrvdkab@gmail.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2022-06-14T05:06:06.586Z',
    updatedAt: '2022-09-14T02:37:00.911Z',
    name: null,
    avatar: null,
    role: {
      id: 4,
      name: 'Editor',
      description: 'Editor',
      type: 'editor',
      createdAt: '2022-09-14T01:21:03.391Z',
      updatedAt: '2022-09-14T01:58:07.254Z',
    },
    comments: [
      {
        id: 39,
        createdAt: '2022-09-09T13:07:33.515Z',
        updatedAt: '2022-09-09T13:07:33.515Z',
        publishedAt: '2022-09-09T13:07:33.513Z',
        name: null,
        email: null,
        content: 'sada',
        blocked: null,
      },
    ],
    volunteer: null,
    votes: [],
  },
  {
    id: 43,
    username: 'MustafaTRKYLMZ',
    email: 'cana66331@gmail.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2022-06-08T17:54:29.280Z',
    updatedAt: '2022-09-14T02:37:10.738Z',
    name: null,
    avatar: null,
    role: {
      id: 6,
      name: 'Admin',
      description: 'Admin',
      type: 'admin',
      createdAt: '2022-09-14T01:53:13.306Z',
      updatedAt: '2022-09-14T01:53:13.306Z',
    },
    volunteer: null,
    votes: [],
  },
  {
    id: 57,
    username: 'Remziye',
    email: 'ikramdemir16@gmail.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2022-07-30T15:58:54.194Z',
    updatedAt: '2022-09-14T02:38:17.216Z',
    name: null,
    avatar: null,
    role: {
      id: 1,
      name: 'Authenticated',
      description: 'Default role given to authenticated user.',
      type: 'authenticated',
      createdAt: '2022-03-31T18:54:29.468Z',
      updatedAt: '2022-09-14T02:07:31.634Z',
    },
    volunteer: null,
    votes: [],
  },
  {
    id: 34,
    username: 'sipif12851@svcache.com',
    email: 'sipif12851@svcache.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2022-04-23T08:45:33.509Z',
    updatedAt: '2022-09-14T02:42:13.233Z',
    name: null,
    avatar: null,
    role: {
      id: 1,
      name: 'Authenticated',
      description: 'Default role given to authenticated user.',
      type: 'authenticated',
      createdAt: '2022-03-31T18:54:29.468Z',
      updatedAt: '2022-09-14T02:07:31.634Z',
    },
    volunteer: null,
    votes: [],
  },
  {
    id: 56,
    username: 'sule art',
    email: 'sulegol16@gmail.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2022-07-16T18:52:46.001Z',
    updatedAt: '2022-09-14T02:42:23.756Z',
    name: null,
    avatar: null,
    role: {
      id: 1,
      name: 'Authenticated',
      description: 'Default role given to authenticated user.',
      type: 'authenticated',
      createdAt: '2022-03-31T18:54:29.468Z',
      updatedAt: '2022-09-14T02:07:31.634Z',
    },
    volunteer: null,
    votes: [],
  },
  {
    id: 53,
    username: 'talipaltas',
    email: 'talipaltas@gmail.com',
    provider: 'google',
    confirmed: true,
    blocked: false,
    createdAt: '2022-06-15T06:07:36.842Z',
    updatedAt: '2022-09-14T02:42:32.832Z',
    name: null,
    avatar: null,
    role: {
      id: 1,
      name: 'Authenticated',
      description: 'Default role given to authenticated user.',
      type: 'authenticated',
      createdAt: '2022-03-31T18:54:29.468Z',
      updatedAt: '2022-09-14T02:07:31.634Z',
    },
    volunteer: null,
    votes: [],
  },
  {
    id: 3,
    username: 'test',
    email: 'test@samenvvv.nl',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2022-03-21T16:29:36.680Z',
    updatedAt: '2022-09-14T02:42:42.037Z',
    name: null,
    avatar: {
      id: 37,
      name: 'profile.jpeg',
      alternativeText: 'profile.jpeg',
      caption: 'profile.jpeg',
      width: 491,
      height: 491,
      formats: {
        thumbnail: {
          ext: '.jpeg',
          url: '/uploads/thumbnail_profile_263c78fbfb.jpeg',
          hash: 'thumbnail_profile_263c78fbfb',
          mime: 'image/jpeg',
          name: 'thumbnail_profile.jpeg',
          path: null,
          size: 1.78,
          width: 156,
          height: 156,
        },
      },
      hash: 'profile_263c78fbfb',
      ext: '.jpeg',
      mime: 'image/jpeg',
      size: 6.45,
      url: '/uploads/profile_263c78fbfb.jpeg',
      previewUrl: null,
      provider: 'local',
      provider_metadata: null,
      createdAt: '2022-04-11T15:33:09.688Z',
      updatedAt: '2022-04-11T15:33:09.688Z',
    },
    role: {
      id: 1,
      name: 'Authenticated',
      description: 'Default role given to authenticated user.',
      type: 'authenticated',
      createdAt: '2022-03-31T18:54:29.468Z',
      updatedAt: '2022-09-14T02:07:31.634Z',
    },
    comments: [
      {
        id: 5,
        createdAt: '2022-06-16T03:21:14.105Z',
        updatedAt: '2022-06-16T03:21:14.105Z',
        publishedAt: '2022-06-16T03:21:14.097Z',
        name: null,
        email: null,
        content: 'Mooie!',
        blocked: null,
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
      },
    ],
    volunteer: null,
    votes: [],
  },
  {
    id: 4,
    username: 'umut',
    email: 'umutesen@gmail.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    createdAt: '2022-03-27T14:22:29.543Z',
    updatedAt: '2022-09-14T02:42:54.688Z',
    name: null,
    avatar: {
      id: 37,
      name: 'profile.jpeg',
      alternativeText: 'profile.jpeg',
      caption: 'profile.jpeg',
      width: 491,
      height: 491,
      formats: {
        thumbnail: {
          ext: '.jpeg',
          url: '/uploads/thumbnail_profile_263c78fbfb.jpeg',
          hash: 'thumbnail_profile_263c78fbfb',
          mime: 'image/jpeg',
          name: 'thumbnail_profile.jpeg',
          path: null,
          size: 1.78,
          width: 156,
          height: 156,
        },
      },
      hash: 'profile_263c78fbfb',
      ext: '.jpeg',
      mime: 'image/jpeg',
      size: 6.45,
      url: '/uploads/profile_263c78fbfb.jpeg',
      previewUrl: null,
      provider: 'local',
      provider_metadata: null,
      createdAt: '2022-04-11T15:33:09.688Z',
      updatedAt: '2022-04-11T15:33:09.688Z',
    },
    role: {
      id: 1,
      name: 'Authenticated',
      description: 'Default role given to authenticated user.',
      type: 'authenticated',
      createdAt: '2022-03-31T18:54:29.468Z',
      updatedAt: '2022-09-14T02:07:31.634Z',
    },
    comments: [],
    volunteer: {
      id: 16,
      username: 'umut',
      name: 'Umut Esen',
      email: 'umut@samenvvv.nl',
      bio: null,
      occupation: null,
      phone: null,
      country: 'NL',
      availableHours: 3,
      heardFrom: null,
      comment: null,
      linkedin: null,
      twitter: null,
      instagram: null,
      facebook: null,
      inMailingList: false,
      approved: false,
      isPublic: false,
      createdAt: '2022-03-27T14:23:27.009Z',
      updatedAt: '2022-09-13T21:34:10.451Z',
      publishedAt: '2022-03-27T14:23:29.324Z',
    },
    votes: [],
  },
]
