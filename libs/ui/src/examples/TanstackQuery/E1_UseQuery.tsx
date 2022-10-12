// TODO: Remove the following eslint line
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Code } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Request } from '@wsvvrijheid/utils'

const getBlogs = () => {
  // TODO: Move queryFn here
}

export const UseQuery = () => {
  /**
   * TODO: Change useQuery args as the following format
   * (current format is = `useQuery(queryKey, queryFn)`)
   * `useQuery({
   *    queryKey: ["..."], // it should always be an array
   *    queryFn: () => { ... }
   * })`
   *
   * TODO: Move queryFn to a separate function called `getBlogs`
   *
   *  */
  const { data, isLoading, isFetching } = useQuery(['blogs', 'tr'], () =>
    Request.collection({
      url: 'api/blogs',
      locale: 'tr',
    }),
  )

  if (isLoading) return <Box>Loading...</Box>
  if (isFetching) return <Box>Fetching...</Box>

  return <Code as="pre">{JSON.stringify(data, null, 2)}</Code>
}
