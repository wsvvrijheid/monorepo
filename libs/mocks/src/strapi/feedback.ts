import { Feedback, StrapiResponse } from '@wsvvrijheid/types'

export const FEEDBACK_MOCK: StrapiResponse<Feedback[]> = {
  data: [
    {
      id: 1,
      message: 'Example feedback',
      point: 7,
      createdAt: '2022-09-13T22:22:12.138Z',
      updatedAt: '2022-09-14T02:51:31.847Z',
      publishedAt: '2022-09-13T22:22:16.067Z',
      status: 'approve',
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
      application: null,
      editor: {
        id: 46,
        username: 'Mrv',
        email: 'mrvdkab@gmail.com',
        provider: 'local',
        confirmed: true,
        blocked: false,
        createdAt: '2022-06-14T05:06:06.586Z',
        updatedAt: '2022-09-14T02:37:00.911Z',
        name: null,
      },
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
}
