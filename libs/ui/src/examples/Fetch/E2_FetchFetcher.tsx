/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { fetcher } from '@wsvvrijheid/utils'

export const FetchFetcher = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetcher(TOKEN).get('api/blogs')
      const data = response?.data
      setBlogs(data)
    }
    getBlogs()
  }, [])

  return (
    <Box>
      {blogs.map(blog => (
        <h2>{blog?.title}</h2>
      ))}
    </Box>
  )
}
