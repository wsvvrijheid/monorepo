import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/utils'

export const getAuthorBlogs = (authorId?: number) => {
  return Request.collection({
    url: 'api/blogs',
    // TODO: Add filters to fetch the blogs of the selected author
    filters: {
      author: {
        id: {
          $eq: authorId,
        },
      },
    },
    locale: 'tr',
  })
}

export const useBlogsQuery = (authorId?: number) => {
  return useQuery({
    queryKey: ['blogs', authorId],
    queryFn: () => getAuthorBlogs(authorId),
  })
}

// const response = await Request.collection<Blog[]>({
//   url: 'api/blogs',
//   filters: {
//     $and: [{ author: { id: { $eq: authorID } } }, { id: { $ne: blogId } }],
//   },
//   sort: ['publishedAt:desc'],
//   pageSize: 2,
//   locale,
// })
