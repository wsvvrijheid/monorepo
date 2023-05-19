import { PostState } from '@wsvvrijheid/context'

export const postMock: PostState = {
  post: {
    id: 1,
    title: 'Post title',
    description: 'Post description',
    content: 'Post content',
    imageParams: {
      bg: 'red',
      color: 'white',
      text: 'Post image text',
      title: 'Post image title',
      image: 'https://picsum.photos/seed/picsum/200/300',
    },
    locale: 'tr',
    createdAt: '2021-08-01T00:00:00.000Z',
    updatedAt: '2021-08-01T00:00:00.000Z',
    publishedAt: '2021-08-01T00:00:00.000Z',
    approvalStatus: 'approved',
    capsStatus: 'approved',
  },
  availableCount: 10,
  count: 7,
  defaultHashtags: ['NOS', 'BedelliOzgurluk'],
  isExceeded: false,
  sentences: ['1::A::1', '1::B::2', '1::C::3'],
  mentionUsernames: ['@wsvvrijheid'],
  postContent: 'Post postContent',
  sentence: 'Post postText',
  threshold: 0,
  trendNames: ['Askeriogrenciler ozgurluk'],
  percentage: 0,
}
