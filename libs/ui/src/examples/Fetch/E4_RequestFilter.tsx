/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box, Stack, Input } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { Blog } from '@wsvvrijheid/types'
import { request } from '@wsvvrijheid/utils'

export type RequestFilterProps = {
  initialValue: string
}

export const RequestFilter: FC<RequestFilterProps> = ({ initialValue }) => {
  const [blogs, setBlogs] = useState<Blog[] | null>([])
  const [titleFIlter, setTitleFilter] = useState(initialValue)

  useEffect(() => {
    ;(async () => {
      const response = await request({
        url: 'api/blogs',
        token: TOKEN,
        locale: 'tr',
        filters: { title: { $contains: titleFIlter } },
      })
      const data = response?.data
      setBlogs(data)
    })()

    // TODO: fetch blogs with filterValue by using our custom request function
    // Changing filteredValue should trigger a new fetch.
    // How could you achieve it by using useEffect?
  }, [titleFIlter])
  const handleOnChange = (e: any) => {
    setTimeout(() => {
      setTitleFilter(e.target.value)
    }, 1000)
  }

  // TODO Add Input to change titleFilter
  return (
    <Box>
      {/* TODO: Show only title of the blogs */}
      <Input onChange={handleOnChange} placeholder="Edit blog title..." />
      {blogs.map(blog => (
        <h2 key={blog?.id}>{blog?.title}</h2>
      ))}
    </Box>
  )
}
