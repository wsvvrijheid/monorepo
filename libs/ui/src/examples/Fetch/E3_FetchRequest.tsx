/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { request } from '@wsvvrijheid/utils'

const BLOG_URL = `${API_URL}/api/blogs`
const API_TOKEN = TOKEN

export const FetchRequest = () => {
  const [blogs, setBlogs] = useState([])

  const getBlogs = async () => {
    try {
      // const { data } = await fetcher(API_TOKEN)(BLOG_URL)
      const { data } = await request({ url: 'api/blogs' })
      console.log(data)
      setBlogs(data) // I have no idea why ts is saying this is null, but I get my data on the screen
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // TODO: fetch blogs with our custom request function
    getBlogs()
  }, [])

  return (
    <Box>
      {/* TODO: Show only title of the blogs */}
      {blogs.map(x => (
        <Box>{x['title']}</Box>
      ))}
    </Box>
  )
}
