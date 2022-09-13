import { Feedback, StrapiResponse } from '@wsvvrijheid/types'

export const FEEDBACK_MOCK: StrapiResponse<Feedback[]> = {
  data: [
    {
      id: 1,
      message: 'Feedback example message',
      point: 4,
      type: 'approve',
      createdAt: '2022-08-28T08:54:34.656Z',
      updatedAt: '2022-08-28T08:54:37.874Z',
      publishedAt: '2022-08-28T08:54:37.871Z',
      art: {
        id: 14,
        title: 'Great place',
        slug: 'great-p',
        description: '',
        content: 'Great place',
        createdAt: '2022-04-01T08:08:15.237Z',
        updatedAt: '2022-06-08T18:33:50.706Z',
        publishedAt: null,
        locale: 'en',
        likes: null,
        views: null,
        translationStatus: null,
        isApproved: null,
        isRejected: null,
      },
      editor: {
        id: 1,
        createdAt: '2022-05-29T17:01:54.573Z',
        updatedAt: '2022-05-29T17:01:58.723Z',
        publishedAt: '2022-05-29T17:01:58.720Z',
      },
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
}
