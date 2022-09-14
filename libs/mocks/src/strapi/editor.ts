import { Editor, StrapiResponse } from '@wsvvrijheid/types'

export const EDITOR_MOCKS: StrapiResponse<Editor[]> = {
  data: [
    {
      id: 1,
      createdAt: '2022-09-13T22:21:20.574Z',
      updatedAt: '2022-09-13T22:22:23.873Z',
      publishedAt: '2022-09-13T22:22:23.872Z',
      feedbacks: [
        {
          id: 1,
          message: 'Example feedback',
          point: 7,
          createdAt: '2022-09-13T22:22:12.138Z',
          updatedAt: '2022-09-13T22:22:16.069Z',
          publishedAt: '2022-09-13T22:22:16.067Z',
          status: 'approve',
        },
      ],
      volunteer: {
        id: 19,
        username: 'hafsa',
        name: 'Hafsa Denizoğlu',
        email: 'hafsa@gmail.com',
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
        approved: true,
        isPublic: false,
        createdAt: '2022-04-01T08:19:18.413Z',
        updatedAt: '2022-06-05T08:45:22.661Z',
        publishedAt: '2022-04-01T08:19:20.210Z',
      },
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
}
