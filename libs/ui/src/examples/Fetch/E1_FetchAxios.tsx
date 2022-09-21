/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'

const BLOG_URL = `${API_URL}/api/blogs` // https://api.samenvvv.nl/api/blogs
const API_TOKEN = TOKEN

export const FetcAxios = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    // TODO: fetch blogs with axios by using the API_URL and TOKEN
  }, [])

  return <Box>{/* TODO: Show only title of the blogs */}</Box>
}
