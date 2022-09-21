/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { request } from '@wsvvrijheid/utils'

export const FetchRequest = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    // TODO: fetch blogs with our custom request function
  }, [])

  return <Box>{/* TODO: Show only title of the blogs */}</Box>
}
