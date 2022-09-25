/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { request } from '@wsvvrijheid/utils'

export type RequestNestedFilterProps = {
  initialName: string
}

export const RequestNestedFilter: FC<RequestNestedFilterProps> = ({
  initialName,
}) => {
  const [blogs, setBlogs] = useState([])
  const [nameFilter, setNameFilter] = useState(initialName)

  const getBlogs = async () => {
    try {
      // const { data } = await fetcher(API_TOKEN)(BLOG_URL)
      const { data } = await request({ url: 'api/blogs' })
      console.log(data)
      setBlogs(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // TODO: Fetch blogs by author name (blog.author.name) with nameFilter by using our custom request function
    // Changing nameFilter should trigger a new fetch.
    // How could you achieve it by using useEffect?
    getBlogs()
  }, [nameFilter])

  // TODO Add Input to change nameFilter
  return (
    <Box>
      {/* TODO: Show only title of the blogs */}
      <input type="text" onChange={e => setNameFilter(e.target.value)} />
      {blogs
        .map(x => x['author']['username'])
        .filter(y => y.includes(nameFilter))
        .map(y => (
          <Box>{y}</Box>
        ))}
    </Box>
  )
}
