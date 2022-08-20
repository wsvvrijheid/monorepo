import { ArtFeedback, StrapiResponse } from '@wsvvrijheid/types'

export const ART_FEEDBACK_MOCK: StrapiResponse<ArtFeedback[]> = {
  data: [
    {
      id: 1,
      message: 'Feedback message',
      point: 5,
      type: 'approve',
      createdAt: '2022-07-23T04:14:32.479Z',
      updatedAt: '2022-07-23T04:14:33.740Z',
      publishedAt: '2022-07-23T04:14:33.737Z',
      art: {
        id: 46,
        title: 'Lotus',
        slug: 'lotus',
        description: 'Lotus description',
        content: 'Lotus content',
        createdAt: '2022-05-27T06:51:08.840Z',
        updatedAt: '2022-06-11T13:35:12.227Z',
        publishedAt: '2022-05-27T06:52:16.757Z',
        locale: 'en',
        status: 'pending',
        previousStatus: null,
        likes: 2,
        views: null,
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
