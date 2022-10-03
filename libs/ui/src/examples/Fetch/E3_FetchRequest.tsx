/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { Blog, StrapiModel } from '@wsvvrijheid/types'
import { request } from '@wsvvrijheid/utils'

export const FetchRequest = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const getBlogs = async () => {
      const response = await request<Blog[]>({
        url: 'api/blogs',
        token: TOKEN,
        locale: 'tr',
      })
      const data = response?.data
      setBlogs(data)
    }
    getBlogs()
    // TODO: fetch blogs with our custom request function
  }, [])

  return (
    <Box>
      {blogs.map(blog => (
        <h2 key={blog.id}>{blog?.title}</h2>
      ))}
    </Box>
  )
}
