/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { Blog } from '@wsvvrijheid/types'
import { fetcher } from '@wsvvrijheid/utils'

export const FetchFetcher = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetcher(TOKEN)('api/blogs')
      const data = response?.data
      setBlogs(data)
    }
    getBlogs()
  }, [])

  return (
    <Box>
      {blogs.map(blog => (
        <h2 key={blog.id}>{blog?.title}</h2>
      ))}
    </Box>
  )
}
