/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, Stack, Text } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { Blog } from '@wsvvrijheid/types'
import axios from 'axios'

const BLOG_URL = `${API_URL}/api/blogs` // https://api.samenvvv.nl/api/blogs
const API_TOKEN = TOKEN

export const FetcAxios = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    // TODO: fetch blogs with axios by using the API_URL and TOKEN
    const getBlogs = async () => {
      const response = await axios.get(BLOG_URL)
      setBlogs(response.data)
    }
    getBlogs()
  }, [])

  return (
    <Box>
      {/* TODO: Show only title of the blogs */}

      {blogs.map(blog => {
        return <Text fontSize="xl">{blog.title}</Text>
      })}
    </Box>
  )
}
