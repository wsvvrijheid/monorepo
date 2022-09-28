/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, Stack, Text } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { Blog } from '@wsvvrijheid/types'
import { request } from '@wsvvrijheid/utils'

export const FetchRequest = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    // TODO: fetch blogs with our custom request function
    const getBlogs = async () => {
      const { data } = await request<Blog[]>({ url: 'api/blogs' })

      setBlogs(data)
    }
    getBlogs()
  }, [])

  return (
    <Box>
      {/* TODO: Show only title of the blogs */}

      {blogs.map(blog => {
        return <Text fontSize="xl">{blog['title']}</Text>
      })}
    </Box>
  )
}
