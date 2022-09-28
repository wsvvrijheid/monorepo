/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box, Input, Stack, Text } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { Blog } from '@wsvvrijheid/types'
import { request } from '@wsvvrijheid/utils'

export type RequestNestedFilterProps = {
  initialName: string
}

export const RequestNestedFilter: FC<RequestNestedFilterProps> = ({
  initialName,
}) => {
  const [blogs, setBlogs] = useState([])
  const [nameFilter, setNameFilter] = useState(initialName)

  useEffect(() => {
    // TODO: Fetch blogs by author name (blog.author.name) with nameFilter by using our custom request function
    // Changing nameFilter should trigger a new fetch.
    // How could you achieve it by using useEffect?
    const getBlogs = async () => {
      const { data } = await request<Blog[]>({
        url: 'api/blogs',
        filters: {
          author: {
            username: {
              $containsi: nameFilter,
            },
          },
        },
        locale: 'tr',
      })

      setBlogs(data)
    }
    getBlogs()
  }, [nameFilter])

  // TODO Add Input to change nameFilter
  return (
    <Box>
      <Input
        placeholder="filter author"
        onChange={event => setNameFilter(event.target.value)}
      />
      {/* TODO: Show only title of the blogs */}
      {blogs.map(blog => {
        return <Text fontSize="xl">{blog['author']['username']}</Text>
      })}
    </Box>
  )
}
