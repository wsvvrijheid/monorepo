/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { fetcher } from '@wsvvrijheid/utils'
import axios from 'axios'

const BLOG_URL = `${API_URL}/api/blogs`
const API_TOKEN = TOKEN

export const FetchFetcher = () => {
  const [blogs, setBlogs] = useState([])

  const getBlogs = async () => {
    try {
      const { data } = await fetcher(API_TOKEN)(BLOG_URL)
      setBlogs(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // TODO: fetch blogs with fetcher by using the API_URL and TOKEN
    // Remember that fetcher is a wrapper around axios that adds the token and api url to the request
    getBlogs()
  }, [])

  console.log(blogs)

  return (
    <Box>
      {/* TODO: Show only title of the blogs */}
      {blogs.map(x => (
        <Box>{x['title']}</Box>
      ))}
    </Box>
  )
}
