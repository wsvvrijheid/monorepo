// TODO: Remove the following eslint line
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'

import { Code, Select, Stack } from '@chakra-ui/react'

import { useAuthorsQuery } from './authors'
import { useBlogsQuery } from './blogs'

export const MultiFetchQuery = () => {
  const [selectedAuthorId, setSelectedAuthorId] = useState<number>()

  const authorsQuery = useAuthorsQuery()
  const blogsQuery = useBlogsQuery(selectedAuthorId)

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
