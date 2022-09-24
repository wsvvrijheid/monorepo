/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, Stack, Text } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { fetcher } from '@wsvvrijheid/utils'
const BLOG_URL = `${API_URL}/api/blogs` // https://api.samenvvv.nl/api/blogs

export const FetchFetcher = () => {
  const [blogs, setBlogs] = useState([])

  const getBlogs = async () => {
    const response = await fetcher()(BLOG_URL)
    setBlogs(response.data)
  }
  useEffect(() => {
    // TODO: fetch blogs with fetcher by using the API_URL and TOKEN
    // Remember that fetcher is a wrapper around axios that adds the token and api url to the request
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
