// TODO: Remove the following eslint line
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Code } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Blog } from '@wsvvrijheid/types'
import { Request } from '@wsvvrijheid/utils'

const getBlogs = async () => {
  // TODO: Move queryFn here

  const data = Request.single<Blog>({
    url: 'api/blogs',
    locale: 'tr',
  })
  return data
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
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['blogs', 'tr'],
    queryFn: getBlogs,
  })
  console.log(isLoading)
  console.log(isFetching)

  return (
    <Box>
      {isLoading && <Box>Loading...</Box>}
      {isFetching && <Box>Fetching...</Box>}
      <Button onClick={() => refetch()}>Refetch</Button>
      <Code as="pre">{JSON.stringify(data, null, 2)}</Code>
    </Box>
  )
}
