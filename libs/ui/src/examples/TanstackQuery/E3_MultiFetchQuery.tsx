// TODO: Remove the following eslint line
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'

import { Code, Select, Stack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { User } from '@wsvvrijheid/types'
import { Request } from '@wsvvrijheid/utils'

const getAuthors = () => {
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

const useAuthorsQuery = () => {
  return useQuery({
    queryKey: ['authors'],
    queryFn: getAuthors,
  })
}

const getAuthorBlogs = (authorId?: number) => {
  return Request.collection({
    url: 'api/blogs',
    // TODO: Add filters to fetch the blogs of the selected author
  })
}

const useBlogsQuery = (authorId?: number) => {
  return useQuery({
    queryKey: ['blogs', authorId],
    queryFn: () => getAuthorBlogs(authorId),
  })
}

export const MultiFetchQuery = () => {
  const [selectedAuthorId, setSelectedAuthorId] = useState<number>()

  const blogsQuery = useBlogsQuery(selectedAuthorId)
  const authorsQuery = useAuthorsQuery()

  console.log('authorsQuery', authorsQuery)

  return (
    <Stack>
      <Select placeholder="Select author">
        {/* TODO: List all the authors and set the selectedAuthorId with onChange method */}
      </Select>
      <Code as="pre">{JSON.stringify(blogsQuery.data, null, 2)}</Code>
    </Stack>
  )
}
