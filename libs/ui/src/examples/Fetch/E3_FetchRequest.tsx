/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { StrapiModel } from '@wsvvrijheid/types'
import { request } from '@wsvvrijheid/utils'

export const FetchRequest = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await request({ url: 'api/blogs', token: TOKEN })
      const data = response?.data
      setBlogs(data)
    })()
    // TODO: fetch blogs with our custom request function
  }, [])

  return (
    <Box>
      {blogs.map(blog => (
        <h2>{blog?.title}</h2>
      ))}
    </Box>
  )
}
