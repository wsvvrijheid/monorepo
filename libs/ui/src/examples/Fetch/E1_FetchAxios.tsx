/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import axios from 'axios'

const BLOG_URL = `${API_URL}/api/blogs` // https://api.samenvvv.nl/api/blogs
const API_TOKEN = TOKEN

export const FetcAxios = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const getBlogs = async () => {
      const response = await axios.get(BLOG_URL)
      const data = await response?.data
      setBlogs(data)
    }
    getBlogs()
  }, [])

  return (
    <Box>
      {blogs.map(blog => (
        <h2>{blog.title}</h2>
      ))}
    </Box>
  )
}
