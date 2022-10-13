import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/utils'

export const getAuthorBlogs = (authorId?: number) => {
  return Request.collection({
    url: 'api/blogs',
    // TODO: Add filters to fetch the blogs of the selected author
  })
}

export const useBlogsQuery = (authorId?: number) => {
  return useQuery({
    queryKey: ['blogs', authorId],
    queryFn: () => getAuthorBlogs(authorId),
  })
}
