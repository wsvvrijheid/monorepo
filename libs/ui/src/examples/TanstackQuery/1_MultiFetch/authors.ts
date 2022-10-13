import { useQuery } from '@tanstack/react-query'
import { User } from '@wsvvrijheid/types'
import { Request } from '@wsvvrijheid/utils'

export const getAuthors = () => {
  return Request.collection<User[]>({
    url: 'api/users',
    filters: {
      blogs: {
        id: {
          // Fetch the users who have at least one blog (authors)
          // There might be a better way to do this
          // You can investigate from Strapi community if you want
          $gt: 0,
        },
      },
    },
  })
}

export const useAuthorsQuery = () => {
  return useQuery({
    queryKey: ['authors'],
    queryFn: getAuthors,
  })
}
