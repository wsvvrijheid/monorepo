/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { fetcher } from '@wsvvrijheid/utils'

export const FetchFetcher = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    // TODO: fetch blogs with fetcher by using the API_URL and TOKEN
    // Remember that fetcher is a wrapper around axios that adds the token and api url to the request
  }, [])

  return <Box>{/* TODO: Show only title of the blogs */}</Box>
}
