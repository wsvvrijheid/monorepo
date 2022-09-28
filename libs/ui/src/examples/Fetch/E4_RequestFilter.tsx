/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { Blog } from '@wsvvrijheid/types'
import { request } from '@wsvvrijheid/utils'

import { BlogCard } from '../../components'
export type RequestFilterProps = {
  initialValue: string
}

export const RequestFilter: FC<RequestFilterProps> = ({ initialValue }) => {
  const [blogs, setBlogs] = useState([])
  const [titleFIlter, setTitleFilter] = useState(initialValue)

  useEffect(() => {
    // TODO: fetch blogs with filterValue by using our custom request function
    // Changing filteredValue should trigger a new fetch.
    // How could you achieve it by using useEffect?
    const getBlogs = async () => {
      const { data } = await request<Blog[]>({
        url: 'api/blogs',
        filters: {
          title: {
            $containsi: titleFIlter,
          },
        },
        locale: 'tr',
      })

      setBlogs(data)
    }
    getBlogs()
  }, [titleFIlter])

  // TODO Add Input to change titleFilter
  return (
    <Box>
      {/* TODO: Show only title of the blogs */}
      <Input
        placeholder="filter"
        onChange={event => setTitleFilter(event.target.value)}
      />
      <Flex flexWrap={'wrap'}>
        {blogs.map((blog, index) => {
          return (
            <Box
              m={3}
              gap={50}
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <BlogCard isFeatured={index === 0} post={blog} />
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}
