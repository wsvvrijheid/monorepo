import { Feedback, StrapiResponse } from '@wsvvrijheid/types'

export const FEEDBACK_MOCK: StrapiResponse<Feedback[]> = {
  data: [
    {
      id: 1,
      message: 'Example feedback',
      point: 7,
      createdAt: '2022-09-13T22:22:12.138Z',
      updatedAt: '2022-09-13T22:22:16.069Z',
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
      editor: {
        id: 1,
        createdAt: '2022-09-13T22:21:20.574Z',
        updatedAt: '2022-09-13T22:22:23.873Z',
        publishedAt: '2022-09-13T22:22:23.872Z',
      },
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
}
