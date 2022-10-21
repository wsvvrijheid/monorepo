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

  // console.log(selectedAuthorId)

  return (
    <Stack>
      <Select
        placeholder="Select author"
        value={selectedAuthorId}
        onChange={e => setSelectedAuthorId(e.target.value)}
      >
        {/* TODO: List all the authors and set the selectedAuthorId with onChange method */}
        {authorsQuery.data?.data.map(author => (
          <option value={author.id}>{author.username}</option>
        ))}
      </Select>
      <Code as="pre">{JSON.stringify(blogsQuery.data, null, 2)}</Code>
    </Stack>
  )
}
